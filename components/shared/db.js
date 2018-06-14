var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.devices = require('../../devices/entities/Device')(sequelize, Sequelize);
db.shares = require('./entities/Share')(sequelize, Sequelize);

db.devices.belongsToMany(db.shares, {through: 'device_share', foreignKey: 'device_id'});
db.shares.belongsToMany(db.devices, {through: 'device_share', foreignKey: 'share_id'});

module.exports = db;