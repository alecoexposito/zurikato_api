var userFactory = require(__dirname + '/../Factories/userFactory');
var deviceFactory = require(__dirname + '/../Factories/deviceFactory');
// var server = require(__dirname + "/../server");
const fs = require('fs');
const multer = require('multer');

var admin = {

    getAllCustomers: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        var users=[];
        if(token != null){
            users = await userFactory._getAll();
            console.log(users);
            res.status(200);
            res.json(users);
        }
        else{
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    getCustomerDetails: function(req, res) {
        var id = req.params.id;
        var customer = '';
        res.json(customer);
    },

    createCustomer: function(req, res) {
        var newCustomer = req.body;
        res.json(newCustomer);
    },

    updateCustomer: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        if(token != null){
            try {
                var updated = await userFactory._update(req.body);
                res.status(200);
                res.json(updated);
            }catch (error){
                res.status(401);
                res.json(error);
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

    deleteCustomer: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        if(token != null){
            try {
                var deleted = await userFactory._delete(req.body);
                res.status(200);
                res.json(deleted);
            }catch (error){
                res.status(401);
                res.json(error);
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

    logModem: async function (req, res) {
        console.log(req.body);
        let d =  new Date();
        fs.appendFile("/var/log/modem-query.log", d.toString() + "\n", function(err) {
            if(err) {
                return console.log(err);
            }
        });

        res.json({
            success: true
        })
        fs.appendFile("/var/log/modem-query.log", req.body.status + "\n", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

        res.json({
            success: true
        })
    },

    uploadFile: async function (req, res) {
        console.log('---------------------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------------------');
        console.log('#################################################################################');

        var dir = "/var/www/html/cameras/" + req.body.deviceId + "/" + req.body.playlist;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }

        fs.rename(req.file.path, "/var/www/html/cameras/" + req.body.deviceId + "/" + req.body.playlist + "/" + req.file.originalname, function() {
            console.log("copiado el fichero" + req.file.originalname);
            if (fs.existsSync(dir + '/last-' + req.file.originalname)){
                const scriptsLocation = '/usr/scripts';
                let videoBackupChannel = scServer.exchange.subscribe(req.body.playlist + '_channel');
                _this.runCommand("sh", [
                    scriptsLocation + '/join-cut-segments.sh',
                    dir
                ], function() {
                    console.log("publicando download-ready");
                    videoBackupChannel.publish({ type: "download-ready" });
                });
            }
            // var filename = dir + "/videos.txt";
            // fs.appendFileSync(filename, "file " + req.file.originalname + "\n", function(err) {
            //     if(err) {
            //         return console.log("error: ", err);
            //     }
            // });
            res.json({
                success: true,
                name: req.file.originalname
            });
        });

        console.log('---------------------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------------------');
        console.log('---------------------------------------------------------------------------------');
    },
    getApiPass: async function(req, res) {
        token = req.header('service_token');
        if (token === 'ec4d5f0a2c9ea2edb03f5b9212e230f74a598e37049378e35a91fd0485977439') {
            var result = '';
            result = await deviceFactory._getApiPass();
            res.json(result);
        } else {
            res.status(403);
            res.json({forbidden: true});
        }
    },


};

module.exports = admin;
