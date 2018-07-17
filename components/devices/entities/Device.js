module.exports = (sequelize, DataTypes)=>{
    const device = sequelize.define('devices', {idDevice: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        auth_device: { type: DataTypes.STRING},
        auth_password: { type: DataTypes.STRING},
        idDeviceModel: { type: DataTypes.STRING},
        label: { type: DataTypes.STRING},
        sim: { type: DataTypes.STRING},
        autoSync: { type: DataTypes.INTEGER},
        license_plate: { type: DataTypes.STRING},
        contact: { type: DataTypes.STRING},
        remark: { type: DataTypes.STRING},
        activation_date: { type: DataTypes.DATE},
        expiration_date: { type: DataTypes.DATE},
        panic_button: { type: DataTypes.INTEGER },
        trashed: { type: DataTypes.BOOLEAN }
    }, {freezeTableName: false});
    return device;
};