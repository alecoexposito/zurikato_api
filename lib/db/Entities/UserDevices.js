module.exports = (sequelize, DataTypes)=>{
    const userDevices = sequelize.define('user_devices', {idUserDevice: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        idUser: { type: DataTypes.INTEGER},
        idDevice: { type: DataTypes.INTEGER},
        label: { type: DataTypes.STRING},
    }, {freezeTableName: false});
    return userDevices;
};