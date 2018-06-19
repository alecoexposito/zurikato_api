module.exports = (sequelize, DataTypes) => {
    const deviceShare = sequelize.define('device_shares', {
        device_id: { type: DataTypes.INTEGER },
        share_id: { type: DataTypes.INTEGER },
    }, { freezeTableName: false });
    return deviceShare;
};