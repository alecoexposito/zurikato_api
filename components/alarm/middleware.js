var factory = require('./factory');
var middleware = {

    storeAlarms: function(req, res) {
        try {
            let data = factory._storeAlarms(req.body);
            res.status(200);
            res.json(data);
        } catch (error) {
            res.status(401);
            res.json(error);
        }
    }
};

module.exports = middleware;