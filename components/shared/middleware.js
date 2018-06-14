var factory = require('./repository');
var middleware = {

    // storeCoords: async function(req, res) {
    //     try {
    //         let data = await factory._storeCoords(req.body);
    //         res.status(200);
    //         res.json(data);
    //     } catch (error) {
    //         res.status(401);
    //         res.json(error);
    //     }
    // }

    getSharedScreen: async function (req, res) {
        try {
            let data = await repository.getSharedScreen(req.params.id);
            res.status(200);
            res.json(data);
        } catch (error) {
            res.status(401);
            res.json(error);
        }
    }
};

module.exports = middleware;