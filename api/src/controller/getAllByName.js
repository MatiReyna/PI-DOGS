const { getAllDogs } = require('./getAllDogs');
const { Dog, Temperament } = require('../DB_connection');

const getAllByName = async (name) => {  // FUNCION QUE DEVUELVE EL PERRO CON EL NAME PASADO POR PARAMETRO

    const allDogs = await getAllDogs();  // EJECUTAMOS EL CONTOLADOR DE TODOS LOS PERROS

    const filterDogApi = allDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase());  // FILTRAMOS LOS DE LA API QUE COINCIDAN CON EL NAME

    const filterDogDb = await Dog.findAll({  // BUSCAMOS EN LA DB QUE COINCIDAN CON EL NAME
        where: { name: name },
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    return [...filterDogApi, ...filterDogDb];  // LOS CONCATENAMOS Y RETORNAMOS LAS DOS JUNTAS
};

module.exports = {
    getAllByName
}