var controller = require('../../controllers/shared');
module.exports = (router) => {
    // router.post('/gps/coords', middleware.storeCoords);
    router.get('/save-shared/:id', middleware.getSharedScreen);

};