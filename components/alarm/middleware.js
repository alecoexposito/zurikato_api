var factory = require('./factory');
var middleware = {

    storeAlarms: function(req, res) {
        try {
            let data = factory._storeAlarms(req.body);
            console.log("llego a la api aki", req.body);
            res.status(200);
            res.json(data);
        } catch (error) {
            res.status(401);
            res.json(error);
        }
    }
};

module.exports = middleware;