const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Dog', {
        id: {
            type: DataTypes.UUID,  // GENERA UN ID ALEATORIO UNICO
            defaultValue: DataTypes.UUIDV4,  // UN IDENTIFICADOR UNIVERSAL UNICO PREDETERMINADO GENERADO SIGUIENDO EL ESTANDAR UUID V4
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
        from: {
            type: DataTypes.STRING,
            defaultValue: "DB"  // ESTABLECE UN VALOR PREDETERMINADO SINO SE LE PROPORCIONA UNO
        },
    }, { timestamps: false })
};