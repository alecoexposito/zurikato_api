var Sequelize = require('sequelize');
var sequelize = require('../../db/dbEngines/mysql/mysql');
const AuthTokenEntity = sequelize.define('user_auth_tokens', {idAuthToken: {type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUser: Sequelize.INTEGER,
    token: Sequelize.STRING,
    vDate: Sequelize.DATE},
    {freezeTableName: false});
    module.exports = AuthTokenEntity;