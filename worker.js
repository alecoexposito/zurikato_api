var SCWorker = require('socketcluster/scworker');
var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middleware = require('./middleware');
var cors = require('cors');
var config = require("./config.js");
var admin = require('./controllers/admin.js');

var socketClient = require('socketcluster-client');
var multer  = require('multer')
var upload = multer({ dest: '/var/www/html/cameras' });


class Worker extends SCWorker {

    async run() {
        //return new Promise(resolve => setTimeout(resolve, 10000));
        console.log('   >> Worker PID:', process.pid);
        try {
            JSON.parse({});
        } catch (error) {
            console.log('OOPS');
        }

        var app = require('express')();
        var httpServer = this.httpServer;
        var scServer = this.scServer;
        app.use(serveStatic(path.resolve(__dirname, 'public')));
        app.use(cors());
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
        app.use(cookieParser());
        app.all('/api/v1/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });
        //app.all('/api/v1/devices/*', [middleware]);
        //app.all('/api/v1/device/*', [middleware]);
        app.all('/api/v1/admin/*', [middleware]);

        // app.use(bodyParser.urlencoded({
        //     extended: true
        // }));
        // app.use(bodyParser.json());
        var router2 = express.Router();
        router2.post('/resend', function (req, res) {
            scServer.exchange.publish("bridgeSocket", req.body);
            res.json(req.body);
        });
        app.use('/api/v1/', [require('./routes'), router2]);
        httpServer.on('request', app);
        scServer.on('connection', function (socket) {
            console.log("alguien se conecto al server");
        });

        //    configurando socketcluster para conectarse al tracker

        var options = {
            secure: false,
            hostname: config.trackerIp,
            port: 3001,
            autoReconnect: true
        };
        // var socket = socketClient.connect(options);
        let socket = socketClient.create(options);
        console.log("llamado el create");
        (async () => {
            for await (let status of socket.listener('connect')) {
                console.log("conectado al server websocket del tracker");
                app.post('/api/v1/start-vpn/:id', (req, res) => {
                    let id = req.params.id;
                    console.log('starting vpn for bb with id: ', id);
                    var vpnChannel = socket.subscribe('vpn_' + id + '_channel');
                    vpnChannel.publish({type: 'start-vpn', id: id});
                    res.json({success: true});
                });

                console.log('--------------------------------- voy a registrar el upload-ts-file ---------------------------');
                app.post('/api/v1/upload-ts-file', upload.single('file'), (req, res) => {
                    console.log("dentro del post ------------------------");
                    admin.uploadFile(req, res, socket);
                });
            }
        })();
    }

    startVpn(socket, id) {

    }
}

new Worker();
