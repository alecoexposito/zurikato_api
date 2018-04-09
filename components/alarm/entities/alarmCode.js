module.exports = (sequelize, DataTypes) => {
    const alarm_code = sequelize.define('alarm_code', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: { type: DataTypes.STRING },
        readable: { type: DataTypes.STRING },
    }, { freezeTableName: true });
    alarm_code.associate = models => {
        alarm_code.hasMany(models.alarm)
    }
    return alarm_code;
};