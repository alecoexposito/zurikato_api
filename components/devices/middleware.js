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

    camerasInAutoplay: async function(req, res) {
        var records = await factory._camerasInAutoplay(req.params.id);
        res.json(records);
    },

    setCameraAutoplay: async function(req, res) {
        console.log(req.body);
        let intervalSeconds = req.body.interval;
        var records = await factory._setCameraAutoplay(req.params.id, intervalSeconds);
        res.json(records);
    },

    removeCameraAutoplay: async function(req, res) {
        var records = await factory._removeCameraAutoplay(req.params.id);
        res.json(records);
    },
};

module.exports = middleware;
