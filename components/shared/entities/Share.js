module.exports = (sequelize, DataTypes) => {
    const shares = sequelize.define('shares', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        expiration_date: { type: DataTypes.DATE },
        url_hash: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE },
        updated_at: { type: DataTypes.DATE },
    }, { freezeTableName: false });
    return shares;
};