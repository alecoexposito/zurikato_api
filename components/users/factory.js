var jwt = require('jsonwebtoken');
var secret = require('../../secret');
var User = require('./interface');
var authToken = require('../../interfaces/AuthToken');
var bcrypt = require('bcryptjs');
const config = require('../../config');
var repository = require('./repository');
var factory = {

    _getDevices: async function(id, isAdmin) {
        let devices = [];
        try {
            devices = await repository.getDevices(id, isAdmin);
        } catch (error) {
            devices = [];
        }
        return devices;
    },

    _getGroups: async function(id, isAdmin, isAdminUser) {
        let groups = [];
        try {
            groups = await repository.getGroups(id, isAdmin, isAdminUser);

        } catch (error) {
            groups = [];
        }
        return groups;
    },

    _register: async function(User) {
        let reg = false;
        try {
            var salt = bcrypt.genSaltSync(config.hash.iterations);
            var hash = bcrypt.hashSync(User.pass, salt);
            User.pass = hash;
            User.salt = salt;
            User.auth_token = genToken(User);
            User.token = genToken(User);
            var dat = await repository.create(User);
            return dat;
        } catch (error) {
            reg = false;
        }
        return reg;
    },

    _update: async function(User) {
        let updated = false;
        try {
            var data = await repository.update(User);
            return data;
        } catch (error) {
            updated = false;
        }
        return updated;
    },

    _delete: async function(User) {
        let updatei = false;
        try {
            var data = await repository.delete(User);
            return data;
        } catch (error) {
            updatei = false;
        }
        return updatei;
    },

    _authenticate: async function(User) {
        var data = await repository.findOneByEmail(User.email);
        if (data != null) {
            if (bcrypt.compareSync(User.pass, data.pass)) {
                User.email = data.email;
                User.label = data.label;
                User.pass = null;
                User.auth_token = data.auth_token;
                return User;
            }
        }
        return false;
    },

    _validateUser: async function(token) {

        var data = await repository.validateToken(token);
        if (data) {
            return data;
        }
        return false;
    },
    _getAll: async function() {
        var data = await repository.getAll();
        return data;
    },
    _updateAutomaticImeis: async function(userId, imeis) {
        var user = await repository.findById(userId);
        user.update({
            automatic_imeis: imeis
        });
        return user;
    },
    _updateFences: async function(userId, fences) {
        var user = await repository.findById(userId);
        user.update({
            fences: fences
        });
        return user;
    }

};

module.exports = factory;

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
