var factory = require('./factory');
var middleware = {

    storeAlarms: function(req, res) {
        try {
            console.log("llego a la api aki2", req.body);
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