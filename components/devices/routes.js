var middleware = require('./middleware');
module.exports = (router) => {

    //router.get('/devices', middleware.all);
    // router.get('/devices/:id', middleware.details);
    //router.get('/devices/:id/profile', middleware.profile);
    router.get('/devices/:id/history', middleware.history);
    router.get('/devices/:id/routes', middleware.routes);
    //router.post('/devices', middleware.create);
    //router.put('/devices/:id', middleware.update);
    //router.delete('/devices/:id', middleware.remove);
    router.get('/devices/:id/speedAverage', middleware.speedAverage);

};