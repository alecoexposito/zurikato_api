var factory = require('./factory');
var middleware = {

    all: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        token = token.replace('JWT', '');
        var users = [];
        if (token != null) {
            users = await factory._getAll();
            console.log(users);
            res.status(200);
            res.json(users);
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    details: async function(req, res) {
        var id = req.params.id;
        var customer = '';
        res.json(customer);
    },
    profile: async function(req, res) {
        var id = req.params.id;
        var customer = '';
        res.json(customer);
    },

    devices: async function(req, res) {
        var id = req.params.id;
        var devices = await factory._getDevices(id);
        res.json(devices);
    },

    groups: async function(req, res) {
        var id = req.params.id;
        var groups = await factory._getGroups(id);
        console.log(groups);
        res.json(groups);
    },

    create: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        token = token.replace('JWT', '');
        if (token != null) {
            try {
                var updated = await factory._register(req.body);
                res.status(200);
                res.json(updated);
            } catch (error) {
                res.status(401);
                res.json(error);
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    update: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        token = token.replace('JWT', '');
        if (token != null) {
            try {
                var updated = await factory._update(req.body);
                res.status(200);
                res.json(updated);
            } catch (error) {
                res.status(401);
                res.json(error);
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    remove: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        token = token.replace('JWT', '');
        if (token != null) {
            try {
                var deleted = await factory._delete(req.body);
                res.status(200);
                res.json(deleted);
            } catch (error) {
                res.status(401);
                res.json(error);
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },
    updateAutomaticImeis: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        token = token.replace('JWT', '');
        if (token != null) {
            try {
                var userId = req.params.id;
                var imeis = req.params.imeis;
                var updated = await factory._updateAutomaticImeis(userId, imeis);
                res.status(200);
                res.json(deleted);
            } catch (error) {
                res.status(401);
                res.json(error);
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    }
};

module.exports = middleware;