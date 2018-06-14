var repository = require('../components/shared/repository');
var shared = {

    getSharedScreen: async function(req, res) {
        res.json(repository.getSharedScreen(req.params.id));
    }

};

module.exports = shared;