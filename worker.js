var SCWorker = require('socketcluster/scworker');
var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middleware = require('./middleware');
var cors = require('cors');

class Worker extends SCWorker {

    run() {
        //return new Promise(resolve => setTimeout(resolve, 10000));
        console.log('   >> Worker PID:', process.pid);
        try{
            JSON.parse({});    
        }catch(error){
            console.log('OOPS');
        }
        
        var app = require('express')();
        var httpServer = this.httpServer;
        var scServer = this.scServer;
        app.use(serveStatic(path.resolve(__dirname, 'public')));
        app.use(cors());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        app.use(cookieParser());
        app.all('/api/v1/*', function(req, res, next) {
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
        scServer.on('connection', function(socket) {
            console.log("alguien se conecto al server");
        });

    }
}
new Worker();
