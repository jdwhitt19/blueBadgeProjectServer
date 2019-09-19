module.exports = function (sequelize, DataTypes) {
    return sequelize.define('operator', {
        name: DataTypes.STRING,
        unit: DataTypes.STRING,
        side: DataTypes.STRING,
        role: DataTypes.STRING,
        stats: DataTypes.STRING,
        loadout: DataTypes.STRING,
        ability: DataTypes.STRING
    });
};