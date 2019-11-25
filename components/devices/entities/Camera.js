module.exports = (sequelize, DataTypes)=>{
    const camera = sequelize.define('camera', {id: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        username: { type: DataTypes.STRING},
        password: { type: DataTypes.STRING},
        ip: { type: DataTypes.STRING},
        port: { type: DataTypes.STRING},
        device_id: { type: DataTypes.INTEGER},
        serial: { type: DataTypes.STRING},
        created_at: { type: DataTypes.DATETIME},
        updated_at: { type: DataTypes.DATETIME},
        url_camera: { type: DataTypes.STRING},
        name: { type: DataTypes.STRING},
        in_autoplay: { type: DataTypes.BOOLEAN},
        autoplay_interval: { type: DataTypes.INTEGER},
    }, {freezeTableName: true});
    return camera;
};
