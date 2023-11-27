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
        minHeight: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 100
            },
            allowNull: false
        },
        maxHeight: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 100
            },
            allowNull: false
        },
        // height: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // weight: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        minWeight: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 100
            },
            allowNull: false
        },
        maxWeight: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 100
            },
            allowNull: false
        },
        // life_span: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        minLife_span: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 20
            },
            allowNull: false
        },
        maxLife_span: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 20
            },
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        from: {  // PARA SABER SI VIENE DE LA API O DE LA DB
            type: DataTypes.STRING
        },
    }, { timestamps: false })
};