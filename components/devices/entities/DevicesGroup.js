module.exports = (sequelize, DataTypes)=>{
    const devicesGroup = sequelize.define('devices_group', {id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        label: { type: DataTypes.STRING},
        user_id: { type: DataTypes.INTEGER}
    }, {freezeTableName: false});
    return devicesGroup;
};