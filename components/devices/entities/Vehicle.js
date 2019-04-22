module.exports = (sequelize, DataTypes)=>{
    const vehicle = sequelize.define('vehicle', {id: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        device_id: { type: DataTypes.INTEGER},
        client_id: { type: DataTypes.INTEGER},
        name: { type: DataTypes.STRING},
        plate_number: { type: DataTypes.STRING},
        brand: { type: DataTypes.STRING},
        model: { type: DataTypes.STRING},
        type: { type: DataTypes.STRING},
        year: { type: DataTypes.STRING},
        route: { type: DataTypes.STRING},
        odometer: { type: DataTypes.STRING},
        model: { type: DataTypes.STRING},
    }, {freezeTableName: false});
    return deviceModel;
};