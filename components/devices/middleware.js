var factory = require('./factory');
var middleware = {

    history: async function(req, res) {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        var histories = await factory._history(req.params.id, start_date, end_date);
        res.json(histories);
    },
    routes: async function(req, res) {
        let date = req.query.date;
        let routesData = await factory._routes(req.params.id, date);
        res.json(routesData);
    },
    speedAverage: async function(req, res) {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        var records = await factory._speedAverage(req.params.id, start_date, end_date);
        res.json(records);
    },
    alarmsByType: async function(req, res) {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        var records = await factory._alarmsByType(req.params.id, start_date, end_date);
        res.json(records);
    },
    coordinatesByDates: async function(req, res) {
        let start_date = req.query.start_date;
        let end_date = req.query.end_date;
        var records = await factory._coordinatesByDates(req.params.id, start_date, end_date);
        res.json(records);
    },
};

module.exports = middleware;