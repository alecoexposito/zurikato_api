var deviceFactory = require(__dirname + '/../Factories/deviceFactory');
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

    getDevicesLastData: async function(req, res) {
        try {
            var jsession = await deviceFactory.getJsession();
            console.log("jsession devuelto en donde era", jsession);
        } catch (e) {
            console.log("error llamando al getjsession", e);
        }
        var devices = await deviceFactory.getDevicesLastData(jsession);
        // console.log("devices: ", devices);
        console.log("-------------------------- GOING TO SAVE ON SEMOV LOG ---------------------------- ");
        deviceFactory.saveSemovLog(JSON.stringify(devices));
        res.status(200);
        res.json(devices);
    }
};

module.exports = devices;
