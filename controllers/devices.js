var deviceFactory = require(__dirname + '/../Factories/deviceFactory');
var request = require("request");
var devices = {

    getAll: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        var devices = await deviceFactory._getDevices(token);
        res.json(devices);
    },

    all: async function(req, res){
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');

        var devices=[];
        if(token != null){
            devices = await deviceFactory._getAll();

            res.status(200);
            res.json(devices);
        }
        else{
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    models: async function(req, res){
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');

        var models=[];
        if(token != null){
            models = await deviceFactory._models();

            res.status(200);
            res.json(models);
        }
        else{
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    getDetails: function(req, res) {
        var id = req.params.id;
        var device = data[0];
        res.json(device);
    },

    create: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        if(token != null){
            try {
                var data = await deviceFactory._register(req.body);
                res.status(200);
                res.json(data);
            }catch (error){
                res.status(401);
                res.json({
                    "status": 401,
                    "message": error
                });
            }
        }
        else{
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }

    },

    update: function(req, res) {
        var updateDevice = req.body;
        var id = req.params.id;
        res.json(updateDevice);
    },

    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1)
        res.json(true);
    },

    getJsession: function() {
        var options = {
            hostname: config.mdvrApiIp,
            port: config.mdvrApiPort,
            path: '/StandardApiAction_login.action?account=' + config.mdvrApiUser + '&password=' + config.mdvrApiPass,
            method: 'GET'
        };

        var optionsR = {
            url: config.mdvrApiIp + ":" + config.mdvrApiPort + '/StandardApiAction_login.action?account=' + config.mdvrApiUser + '&password=' + config.mdvrApiPass,
            headers: {
                'User-Agent': 'request'
            }
        };

        return new Promise((resolve, reject) => {
            console.log("options:  ", options);

            request.get(optionsR, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body.jsession);
                }
            })
            // var jsession = "";
            // http.request(options, function (res) {
            //     console.log('LOGIN STATUS: ' + res.statusCode);
            //     // console.log('HEADERS: ' + JSON.stringify(res.headers));
            //
            //     res.setEncoding('utf8');
            //     res.on('data', function (data) {
            //         // console.log("first time data: ", data);
            //         jsession = JSON.parse(data).jsession;
            //         console.log("JSESSION: ", jsession);
            //         resolve(jsession);
            //     });
            // }).
            // on("error", function(err) {
            //     reject(err);
            // }).
            // end();
        });
    },

    getDevicesLastData: async function(req, res) {
        var _this = this;
        var jsession = await _this.getJsession();
        console.log("jsession devuelto en donde era", jsession);
        var devices = deviceFactory.getDevicesLastData(jsession);

        res.status(200);
        res.json(devices);
    }
};

module.exports = devices;