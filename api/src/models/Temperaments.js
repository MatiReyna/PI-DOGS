const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, { timestamps: false })  // OBJETO DE OPCIONES QUE DESACTIVA LA CREACION AUTOMATICA DE CAMPOS
};