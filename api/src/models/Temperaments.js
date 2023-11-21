const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     allowNull: false
        // },  SEQUELIZE ME GENERA SOLO UN ID
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: false })
};