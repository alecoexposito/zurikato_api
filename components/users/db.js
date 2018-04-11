var Sequelize = require('sequelize');
var sequelize = require('../../lib/db/dbEngines/mysql/mysql');
var deviceEntity = require('../devices/entities/Device')(sequelize, Sequelize);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.relations = {};
db.users = require('./entities/user')(sequelize, Sequelize);
db.userRole = require('./entities/UserRole')(sequelize, Sequelize);
db.devicesGroup = require('../devices/entities/DevicesGroup')(sequelize, Sequelize);
/*db.userDevices = require('./entities/UserDevices.js')(sequelize, Sequelize);
db.users.belongsTo(db.userRole, { foreignKey: 'userType' });
db.userRole.hasMany(db.users, { foreignKey: 'userType' });
db.users.belongsToMany(deviceEntity, {
    through: {
        model: db.userDevices,
        unique: false
    },
    foreignKey: 'idUser',
    constraints: false
});
db.relations.device = deviceEntity;*/
db.devicesGroup.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasMany(db.users, { foreignKey: 'user_id' });

module.exports = db;