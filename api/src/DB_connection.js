require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const dogModel = require('./models/Dog');
const temperamentModel = require('./models/Temperaments');

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
    {logging: false, native: false}
);

dogModel(sequelize);
temperamentModel(sequelize);

const { Dog, Temperament } = sequelize.models;  // RELACIONAMOS LOS MODELOS, HACEMOS DESTRUCTURING

Dog.belongsToMany(Temperament, { through: 'dog_temperament' });
Temperament.belongsToMany(Dog, { through: 'dog_temperament' });

module.exports = {
    conn: sequelize,
    Dog,
    Temperament
}