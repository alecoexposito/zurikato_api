var jwt = require('jsonwebtoken');
var secret = require('../secret');
var repository = require('../lib/db/repository');
var config = require("../config.js");
var request = require("request");

var deviceFactory = {

    _getDevices: async function(token) {
        let devices = [];
        try {
            devices = await repository.users.getDevices(token);

        } catch (error) {
            devices=[];
        }
        return devices;
    },
    _getAll: async function() {
        let devices = [];
        try {
            devices = await repository.devices.getAll();

        } catch (error) {
            console.log(error);
        }
        return devices;
    },
    _models: async function() {
        let models = [];
        try {
            models = await repository.devices.models();

        } catch (error) {
            console.log(error);
        }
        return models;
    },
    _register: async function(Device) {
        let created = false;
        try {
            var dat = await repository.devices.create(Device);
            return dat;
        } catch (error) {
            created = false;
        }
        return created;
    },
    _update: async function(Device){
        let updated = false;
        try {
            var data = await repository.devices.update(Device);
            return data;
        }catch(error){
            updated = false;
        }
        return updated;
    },

    _delete: async function(Device){
        let deleted = false;
        try {
            var data = await repository.devices.delete(Device);
            return data;
        }catch(error){
            deleted = false;
        }
        return deleted;
    },

    getJsession: function() {
        var optionsR = {
            url: "http://" + config.mdvrApiIp + ":" + config.mdvrApiPort + '/StandardApiAction_login.action?account=' + config.mdvrApiUser + '&password=' + config.mdvrApiPass,
            headers: {
                'User-Agent': 'request'
            }
        };

        return new Promise((resolve, reject) => {
            console.log("options:  ", optionsR);

            request.get(optionsR, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body).jsession);
                }
            });
        });
    },

    getDevicesLastData: async function(jsession) {
        try {
            var data = await repository.devices.getDevicesLastData();
            console.log("data del respository: ", data);
            dataArray = [];
            var result = { ArrayOfVehiclesOnlyGps_Result: dataArray};
            if(jsession != undefined) {
                data.forEach(function(value) {
                    var param3 = jsession + ",3," + value.IMEI + ",0,1,0,0";
                    var param3Base64 = Buffer.from(param3).toString("base64");
                    console.log("value en el foreach", value);

                    value.TextRow.UrlCamera = "rtsp://209.126.127.171:6604/" + param3Base64;
                    dataArray.push({
                        VehicleOnlyGps_Result: value
                    });
                });
            }
            return result;
        }catch(error){
            console.log(error);
            return false;
        }
    }
};

module.exports = deviceFactory;