var db = require('./db');
const repository = {};

repository.users = require('./Repository/Users')(db);
repository.devices = require('./Repository/Devices')(db);

module.exports = repository;