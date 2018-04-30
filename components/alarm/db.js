var Sequelize = require('sequelize');
var path = require("path");
var sequelize = require('../../lib/db/dbEngines/mysql/mysql');
const db = {};
var alarm = sequelize.import(path.join(__dirname,'entities/alarm'));
var alarm_code = sequelize.import(path.join(__dirname,'entities/alarmCode'));
db.devices = require('../devices/entities/Device')(sequelize, Sequelize);

db[alarm.name] = alarm;
db[alarm_code.name] = alarm_code;
db[alarm.name].associate(db);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;