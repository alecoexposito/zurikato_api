var jwt = require('jsonwebtoken');
var secret = require('../secret');
var repository = require('../lib/db/repository');
var config = require("../config.js");
var request = require("request");
var moment = require("moment");

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
    _getBBs: async function(token) {
        let devices = [];
        try {
            devices = await repository.devices.getBBs(token);

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

    getJsession: async function() {

        let result = await this._getApiPass();
        let pass = result[0].api_pass;
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        console.log("***********************REQUEST DEL PASS*********", pass);
        var optionsR = {
            url: "http://" + config.mdvrApiIp + ":" + config.mdvrApiPort + '/StandardApiAction_login.action?account=' + config.mdvrApiUser + '&password=' + pass,
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
    _getApiPass: async function() {
        let result = [];
        try {
            result = await repository.devices.getApiPass();

        } catch (error) {
            result = [];
        }
        return result;
    },

    getDevicesLastData: async function(jsession) {
        try {
            var data = await repository.devices.getDevicesLastData();
            dataArray = [];
            var result = { ArrayOfVehiclesOnlyGps_Result: dataArray};
            data.forEach(function(value) {
                var idDevice = value.idDevice;
                var utcDate = moment.utc(dateStr, 'DD/MM/YYYY HH:mm:ss');
                if(jsession != undefined) {
                    var dateStr = value.Date + " " + value.Time;
                    var localDate = utcDate.local();

                    var param3 = jsession + ",3," + value.IMEI + ",0,1,0,0";
                    var param3Base64 = Buffer.from(param3).toString("base64");

                    value.Provider = config.Provider;
                    value.IDCompany = config.IDCompany;
                    // value.UrlCamera = "rtsp://209.126.127.171:6604/" + param3Base64;
                    value.UrlCamera = "http://" + config.mdvrApiIp + ":" + config.mdvrApiPort + "/808gps/open/player/video.html?lang=en&devIdno=" + value.IMEI + "&jsession=" + jsession;
                    value.Date = utcDate.local().format('DD/MM/YYYY');
                    value.Time = utcDate.local().format('HH:mm:ss');
                } else {
                    value.Provider = config.Provider;
                    value.IDCompany = config.IDCompany;
                    value.UrlCamera = config.urlCamera + idDevice;
                    value.Date = utcDate.local().format('DD/MM/YYYY');
                    value.Time = utcDate.local().format('HH:mm:ss');
                }
                delete value.idDevice;
                dataArray.push(
                    value
                );
            });
            console.log("resultado a retornar: ", result);
            return result;
        }catch(error){
            console.log(error);
            return false;
        }
    },

    saveSemovLog: function(json_data) {
        repository.devices.saveSemovLog(json_data);
    }
};

module.exports = deviceFactory;
