var userFactory = require(__dirname + '/../Factories/userFactory');
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
        console.log('---------------------------------------------------------------------------------')
        console.log('---------------------------------------------------------------------------------')
        console.log('#################################################################################')

        var dir = "/var/www/html/cameras/" + req.body.deviceId + "/" + req.body.playlist;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }

        fs.rename(req.file.path, "/var/www/html/cameras/" + req.body.deviceId + "/" + req.body.playlist + "/" + req.file.originalname, function() {
            console.log("copiado el fichero" + req.file.originalname);
        });

        console.log('---------------------------------------------------------------------------------')
        console.log('---------------------------------------------------------------------------------')
        console.log('---------------------------------------------------------------------------------')
        res.json({
            success: true
        });
    }

};

module.exports = admin;
