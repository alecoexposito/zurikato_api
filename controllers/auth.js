var jwt = require('jsonwebtoken');
var secret = require('../secret');
var userFactory = require(__dirname + '/../Factories/userFactory');

var auth = {

    login: async function(req, res) {
        var data = await userFactory._authenticate(req.body);
        if (data) {
            res.status(200);
            res.json(data);
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },

    register: async function(req, res) {
        var data = await userFactory._register(req.body);
        if (data) {
            res.status(200);
            res.json(data);
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    },
    profile: function(req, res) {

    },

    validate: function(username, password) {},

    validateUser: async function(token) {

        var user = await userFactory._validateUser(token);

        return user;

    },
};

function genToken(user) {
    var expires = expiresIn(7);
    var token = jwt.sign({
        exp: expires
    }, secret());
    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;