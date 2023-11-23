const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Dog', {
        id: {
            type: DataTypes.UUID,  // GENERA UN ID ALEATORIO UNICO
            defaultValue: DataTypes.UUIDV4,  // UN IDENTIFICADOR UNIVERSAL UNICO PREDETERMINADO GENERADO SIGUIENDO EL ESTANDAR UUID V4
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life_span: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createDB: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, { timestamps: false })
};