var jwt = require('jsonwebtoken');
var secret = require('../../secret');
var authToken = require('../../interfaces/AuthToken');
var bcrypt = require('bcryptjs');
const config = require('../../config');
var repository = require('./repository');
var factory = {

    _coordinatesByDates: async function(id, start_date, end_date) {
        let records = [];
        try {
            records = await repository.coordinatesByDates(id, start_date, end_date);
        } catch (error) {
            records = [];
        }
        return records;
    },
    _alarmsByType: async function(id, start_date, end_date) {
        let records = [];
        try {
            records = await repository.alarmsByType(id, start_date, end_date);
        } catch (error) {
            records = [];
        }
        return records;
    },
    _speedAverage: async function(id, start_date, end_date) {
        let records = [];
        try {
            records = await repository.speedAverage(id, start_date, end_date);
        } catch (error) {
            records = [];
        }
        return records;
    },
    _history: async function(id, start_date, end_date) {
        let histories = [];
        try {
            histories = await repository.history(id, start_date, end_date);

        } catch (error) {
            histories = [];
        }
        return histories;
    },

    _routes: async function(id, date) {
        let routesData = [];
        try {
            routesData = await repository.routes(id, date);

        } catch (error) {
            routesData = [];
        }
        return routesData;
    }
};

module.exports = factory;