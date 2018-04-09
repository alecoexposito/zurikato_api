var middleware = require('./middleware');
module.exports = (router) => {
    router.post('/gps/coords', middleware.storeCoords);

};