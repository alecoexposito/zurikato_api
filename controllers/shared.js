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


    },
    saveShared: async function(req, res) {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ','');
        token = token.replace('JWT','');
        if(token != null){
            var sharedLink = await repository.saveShared(req.body);
            res.status(200);
            res.json(sharedLink);
        }
        else{
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
    }

};

module.exports = shared;