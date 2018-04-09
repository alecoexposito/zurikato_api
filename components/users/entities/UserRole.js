module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('user_roles', {
        idUserRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: { type: DataTypes.STRING }
    }, { freezeTableName: false });
    return UserRole;
};