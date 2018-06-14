var sharedMiddleware = require(__dirname + '/components/shared/repository');
var shared = {

    getSharedScreen: async function(req, res) {
        res.json(sharedMiddleware.getSharedScreen(req.params.id));
    }
    
};

module.exports = shared;