require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
    DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
    {logging: false, native: false}
);

// EJECUTAMOS LOS MODELOS

// RELACIONAMOS LOS MODELOS
const { Dog } = sequelize.models;

module.exports = {
    ...sequelize.models,
    conn: sequelize
}