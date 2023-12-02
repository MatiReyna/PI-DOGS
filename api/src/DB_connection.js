require('dotenv').config();  // CARGA LAS VARIABLE DE ENTORNO
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;  // VARIABLES DE ENTORNO
const dogModel = require('./models/Dog');
const temperamentModel = require('./models/Temperaments');

// CONFIGURACION DE SEQUELIZE

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
    {logging: false, native: false}
);

dogModel(sequelize);  // EJECUTAMOS LOS MODELOS PASANDOLE SEQUELIZE
temperamentModel(sequelize);

const { Dog, Temperament } = sequelize.models;  // RELACIONAMOS LOS MODELOS, HACEMOS DESTRUCTURING

Dog.belongsToMany(Temperament, { through: 'dog_temperament' });  // SE CREA LA TABLA INTERMEDIA
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = {
    conn: sequelize,
    Dog,
    Temperament
}