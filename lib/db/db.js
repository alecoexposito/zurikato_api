var Sequelize = require('sequelize');
var sequelize = require('./dbEngines/mysql/mysql');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../../components/users/entities/user')(sequelize, Sequelize);
db.userRole = require('../../components/users/entities/UserRole')(sequelize, Sequelize);
db.devices = require('../../components/devices/entities/Device')(sequelize, Sequelize);
db.deviceModel = require('../../components/devices/entities/DeviceModel')(sequelize, Sequelize);
db.userDevices = require('../../components/users/entities/UserDevices')(sequelize, Sequelize);
db.gpsData = require('../../components/gps/entities/GpsData.js')(sequelize, Sequelize);

db.users.belongsTo(db.userRole, { foreignKey: 'userType' });
db.userRole.hasMany(db.users, { foreignKey: 'userType' });
db.gpsData.belongsTo(db.devices, { foreignKey: 'idDevice' });
db.devices.hasMany(db.gpsData, { foreignKey: 'idDevice' });
db.devices.belongsTo(db.deviceModel, { foreignKey: 'idDeviceModel' });
db.deviceModel.hasMany(db.devices, { foreignKey: 'idDeviceModel' });
db.devices.belongsToMany(db.users, {
    through: {
        model: db.userDevices,
        unique: false,
    },
    foreignKey: 'idDevice',
    constraints: false
});
db.users.belongsToMany(db.devices, {
    through: {
        model: db.userDevices,
        unique: false
    },
    foreignKey: 'idUser',
    constraints: false
});

module.exports = db;