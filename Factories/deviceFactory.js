var jwt = require('jsonwebtoken');
var secret = require('../secret');
var repository = require('../lib/db/repository');
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
            var data = await repository.devices.getDevicesLastData();
            dataArray = [];
            var result = { ArrayOfVehiclesOnlyGps_Result: dataArray};
            data.forEach(function(value) {
                dataArray.push({
                    VehicleOnlyGps_Result: value
                });
            });
            return result;
        }catch(error){
            return false;
        }
    }
};

module.exports = deviceFactory;