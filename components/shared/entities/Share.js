module.exports = (sequelize, DataTypes) => {
    const shares = sequelize.define('shares', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        device_id: { type: DataTypes.INTEGER },
        orientation_plain: { type: DataTypes.STRING },
        expiration_date: { type: DataTypes.DATETIME },
        url_hash: { type: DataTypes.STRING },
        uuid: { type: DataTypes.STRING },
    }, { freezeTableName: false });
    return sharedDevice;
};