var jwt = require('jsonwebtoken');
var secret = require('../secret');
var User = require('../interfaces/User');
var authToken = require('../interfaces/AuthToken');
var bcrypt = require('bcryptjs');
const config = require('../config');
var repository = require('../lib/db/repository');
var userFactory = {

    _register: async function(User) {
        let reg = false;
        try {
            var salt = bcrypt.genSaltSync(config.hash.iterations);
            var hash = bcrypt.hashSync(User.pass, salt);
            User.pass = hash;
            User.salt = salt;
            User.auth_token = genToken(User);
            User.token = genToken(User);
            var dat = await repository.users.create(User);
            return dat;
        } catch (error) {
            reg = false;
        }
        return reg;
    },

    _update: async function(User) {
        let updated = false;
        try {
            var data = await repository.users.update(User);
            return data;
        } catch (error) {
            updated = false;
        }
        return updated;
    },

    _delete: async function(User) {
        let updatei = false;
        try {
            var data = await repository.users.delete(User);
            return data;
        } catch (error) {
            updatei = false;
        }
        return updatei;
    },

    _authenticate: async function(User) {
        var data = await repository.users.findOneByUsername(User.email);
        if (data != null) {
            if (bcrypt.compareSync(User.pass, data.pass)) {
                User.email = data.email;
                User.label = data.label;
                User.id = data.idUser;
                User.pass = null;
                User.username = data.username;
                User.automatic_imeis = data.automatic_imeis;
                User.fences = data.fences;
                User.company_name = data.company_name;
                if(data.auth_token == "") {
                    data.auth_token = genToken(repository.users.parseUser(data));
                }
                User.auth_token = data.auth_token;
                User.roles = data.roles;
                User.admin_id = data.admin_id;
                return User;
            }
        }
        return false;
    },

    _validateUser: async function(token) {

        var data = await repository.users.validateToken(token);
        if (data) {
            return data;
        }
        return false;
    },
    _getAll: async function() {
        var data = await repository.users.getAll();
        return data;
    }
};

module.exports = userFactory;

function genToken(user) {
    /*var expires = expiresIn(7);
    var token = jwt.sign({
        exp: expires
    }, secret());*/
    const token = jwt.sign(user, secret(), {
        expiresIn: 604800
    });
    return token;
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
