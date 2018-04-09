var middleware = require('./middleware');
module.exports = (router) => {

    router.get('/users', middleware.all);
    router.get('/users/:id', middleware.details);
    router.get('/users/:id/profile', middleware.profile);
    router.get('/users/:id/devices', middleware.devices);
    router.get('users/:id/groups', middleware.groups)
    router.post('/users', middleware.create);
    router.put('/users/:id', middleware.update);
    router.delete('/users/:id', middleware.remove);

};