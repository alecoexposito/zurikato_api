var jwt = require('jsonwebtoken');
var secret = require('./secret');
var validateUser = require(__dirname + '/controllers/auth').validateUser;
module.exports = async function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['authorization'];
    var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

    if (token || key) {
        try {

            token = token.replace('Bearer ','');
            token = token.replace('JWT','');
            var decoded = jwt.verify(token, secret());
            if (decoded.expiresIn <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }
            var dbUser = await validateUser(token);
            if (dbUser) {
                if ((req.url.indexOf('admin') >= 0 && dbUser.user_role.role == 'Administrador') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                    next(); // To move to next middleware
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                    return;
                }
            } else {
                // No user with this name exists, respond back with a 401
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User"
                });
                return;
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token or Key"
        });
        return;
    }
};