const { Dog, Temperament } = require('../DB_connection');

const getDbDogs = async () => {  // CONSULTA A LA BASE DE DATOS PARA OBTENER TODOS LOS PERROS

    const dbDog = await Dog.findAll({  // BUSCA PERROS EN LA DB
        include: {  // PARA INCLUIR INFO ADICIONAL DEL MODELO TEMPERAMENT
            model: Temperament,
            attributes: ['name'],  // SOLO SE QUIERE EL NOMBRE DEL MODELO TEMPERAMENT
            through: {
                attributes: []
            }
        }
    });
    return dbDog;
};

module.exports = {
    getDbDogs
}