var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
var userEntity = require('../users/entities/UserDevices')(sequelize, Sequelize);
var user = require('../users/entities/user')(sequelize, Sequelize);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.devices = require('./entities/Device')(sequelize, Sequelize);
db.deviceModel = require('./entities/DeviceModel.js')(sequelize, Sequelize);
db.vehicle = require('./entities/Vehicle.js')(sequelize, Sequelize);
db.vehicle = require('./entities/Camera.js')(sequelize, Sequelize);

db.devices.belongsTo(db.deviceModel, { foreignKey: 'idDeviceModel' });
db.deviceModel.hasMany(db.devices, { foreignKey: 'idDeviceModel' });
db.devices.hasOne(db.vehicle, {foreignKey: 'device_id'});

db.devices.belongsToMany(user, {
    through: {
        model: userEntity,
        unique: false,
    },
    foreignKey: 'idDevice',
    constraints: false
});

db.camera.belongsTo(db.devices, { foreignKey: 'device_id' });
db.devices.hasMany(db.camera, { foreignKey: 'device_id' });


module.exports = db;
