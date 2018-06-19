module.exports = (sequelize, DataTypes) => {
    const deviceShare = sequelize.define('device_share', {
        device_id: { type: DataTypes.INTEGER },
        share_id: { type: DataTypes.INTEGER },
    }, { freezeTableName: false });
    return deviceShare;
};