var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.devices = require('../../devices/entities/Device')(sequelize, Sequelize);
db.shares = require('./entities/Share')(sequelize, Sequelize);

db.devices.belongsToMany(db.shares, {through: 'DeviceShare'});
db.shares.belongsToMany(db.devices, {through: 'DeviceShare'});
db.shares.sync();
module.exports = db;