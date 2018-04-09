module.exports = (sequelize, DataTypes) => {
    const alarm = sequelize.define('alarm', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        device: { type: DataTypes.INTEGER },
        lat: { type: DataTypes.FLOAT },
        lng: { type: DataTypes.FLOAT },
        speed: { type: DataTypes.FLOAT },
        code: { type: DataTypes.INTEGER },
    }, { freezeTableName: true });
    alarm.associate = models => {
        alarm.belongsTo(models.alarm_code,{ foreignKey: 'code' })
    }
    return alarm;
};