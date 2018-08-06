module.exports = (sequelize, DataTypes)=> {

    const UserEntity = sequelize.define('users', {idUser: {type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
        email: { type: DataTypes.STRING, unique: true },
        label: DataTypes.STRING,
        telephone: DataTypes.STRING,
        pass: DataTypes.STRING,
        salt: DataTypes.STRING,
        userType: DataTypes.INTEGER,
        parent: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
        auth_token: DataTypes.STRING,
        token: DataTypes.STRING,
        username: DataTypes.STRING,
        company_name: DataTypes.STRING,
        automatic_imeis: DataTypes.STRING
    }, {freezeTableName: false});
    return UserEntity;
};