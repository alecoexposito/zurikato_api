var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
var userEntity = require('../users/entities/UserDevices')(sequelize, Sequelize);
var user = require('../users/entities/user')(sequelize, Sequelize);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.devices = require('./entities/Device')(sequelize, Sequelize);
db.deviceModel = require('./entities/DeviceModel.js')(sequelize, Sequelize);
db.devicesGroup = require('./entities/DevicesGroup')(sequelize, Sequelize);
db.devices.belongsTo(db.deviceModel, { foreignKey: 'idDeviceModel' });
db.deviceModel.hasMany(db.devices, { foreignKey: 'idDeviceModel' });

db.devicesGroup.belongsTo(db.users, { foreignKey: 'client_id' });
db.devicesGroup.hasMany(db.users, { foreignKey: 'client_id' });

db.devices.belongsTo(db.devicesGroup, { foreignKey: 'devices_group_id' });
db.devicesGroup.hasMany(db.devices, { foreignKey: 'devices_group_id' });

db.devices.belongsToMany(user, {
    through: {
        model: userEntity,
        unique: false,
    },
    foreignKey: 'idDevice',
    constraints: false
});

module.exports = db;