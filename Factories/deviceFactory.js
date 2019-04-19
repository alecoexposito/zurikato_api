var jwt = require('jsonwebtoken');
var secret = require('../secret');
var repository = require('../lib/db/repository');
var config = require('../config');
var http = require('http');

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

    getDevicesLastData: async function() {
        try {

            var options = {
                hostname: config.mdvrApiIp,
                port: config.mdvrApiPort,
                path: '/StandardApiAction_login.action?account=' + config.mdvrApiUser + '&password=' + config.mdvrApiPass,
                method: 'GET'
            };
            console.log("options:  ", options);
            var jsession = "";
            http.request(_this.options, function (res) {
                console.log('LOGIN STATUS: ' + res.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(res.headers));

                res.setEncoding('utf8');
                res.on('data', function (data) {
                    // console.log("first time data: ", data);
                    jsession = JSON.parse(data).jsession;
                    console.log("JSESSION: ", _this.jsession);
                    var data = repository.devices.getDevicesLastData();
                    dataArray = [];
                    var result = { ArrayOfVehiclesOnlyGps_Result: dataArray};
                    data.forEach(function(value) {
                        var param3 = "jsession" + ",3," + value.IMEI + ",0,1,0,0";
                        var param3Base64 = btoa(param3);
                        var cameraUrl = "rtsp://209.126.127.171:6604/" + param3Base64;
                        value.UrlCamera = cameraUrl;
                        dataArray.push({
                            VehicleOnlyGps_Result: value
                        });
                    });
                });
            }).end();



            return result;
        }catch(error){
            throw error;
            return false;
        }
    }
};

module.exports = deviceFactory;