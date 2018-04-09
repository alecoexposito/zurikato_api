module.exports = (sequelize, DataTypes) => {
    const device = sequelize.define('peripheral_gps_data', {
        idPeripheralGps: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idDevice: { type: DataTypes.INTEGER },
        lat: { type: DataTypes.FLOAT },
        lng: { type: DataTypes.FLOAT },
        speed: { type: DataTypes.STRING },
        vDate: { type: DataTypes.STRING },
        uuid: { type: DataTypes.STRING },
    }, { freezeTableName: false });
    return device;
};