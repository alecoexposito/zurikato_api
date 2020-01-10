var middleware = require('./middleware');
module.exports = (router) => {

    router.get('/users', middleware.all);
    router.get('/users/:id', middleware.details);
    router.get('/users/:id/profile', middleware.profile);
    router.get('/users/:id/devices/:isAdmin/:isAdminUser', middleware.devices);
    router.get('/users/:id/groups/:isAdmin/:isAdminUser', middleware.groups)
    router.post('/users', middleware.create);
    router.put('/users/:id', middleware.update);
    router.delete('/users/:id', middleware.remove);
    router.put('/users/:id/updimeis/:imeis', middleware.updateAutomaticImeis);
    router.put('/users/:id/updfences/', middleware.updateFences);

};
