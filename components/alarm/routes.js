var middleware = require('./middleware');
module.exports = (router) => {
    router.post('/alarms', middleware.storeAlarms);

};