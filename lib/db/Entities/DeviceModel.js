module.exports = (sequelize, DataTypes)=>{
    const deviceModel = sequelize.define('device_models', {idDeviceModel: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        label: { type: DataTypes.STRING},
        peripheral_gps: { type: DataTypes.INTEGER},
        peripheral_ticketsseller: { type: DataTypes.INTEGER},
        peripheral_cam1: { type: DataTypes.INTEGER},
        peripheral_cam2: { type: DataTypes.INTEGER},
        peripheral_cam3: { type: DataTypes.INTEGER},
        peripheral_cam4: { type: DataTypes.INTEGER},
    }, {freezeTableName: false});
    return deviceModel;
};