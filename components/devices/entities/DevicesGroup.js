module.exports = (sequelize, DataTypes)=>{
    const devicesGroup = sequelize.define('devices_group', {id: {type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        label: { type: DataTypes.STRING},
    }, {freezeTableName: false});
    return devicesGroup;
};