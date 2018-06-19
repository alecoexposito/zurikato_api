var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.devices = require('../../devices/entities/Device')(sequelize, Sequelize);
db.shares = require('./entities/Share')(sequelize, Sequelize);
db.deviceShare = require('./entities/DeviceShare')(sequelize, Sequelize);
db.devices.belongsToMany(db.shares, {through: 'device_shares', foreignKey: 'device_id'});
db.shares.hasMany(db.devices, {through: 'device_shares', foreignKey: 'share_id', as: 'devices'});

module.exports = db;