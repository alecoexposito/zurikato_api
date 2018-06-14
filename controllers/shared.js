var repository = require('../components/shared/repository');
var shared = {

    getSharedScreen: async function(req, res) {
        try {
            var share = await repository.getSharedScreen(req.params.id);
            res.status(200);
            res.json(share);
        } catch (e) {
            res.status(500);
            res.message("problem loading the share");
        }


    }

};

module.exports = shared;