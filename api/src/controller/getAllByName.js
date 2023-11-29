const { getAllDogs } = require('./getAllDogs');
const { Dog, Temperament } = require('../DB_connection');

const getAllByName = async (name) => {  // FUNCION QUE DEVUELVE EL PERRO CON EL NAME PASADO POR PARAMETRO

    // const allDogs = await getAllDogs();  // OBTENEMOS LA LISTA COMPLETA DE LOS PERROS

    // // FILTRAMOS LOS PERROS QUE CONTIENE EL NAME POR PARAMETRO EN SU NOMBRE

    // const filterName = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

    // if (filterName.length) {  // EL FILTER DA UN ARRAY POR LO QUE SI ES MAYOR A 0 SIGNIFICA QUE HAY
    //     return filterName
    // } else {
    //     return (`Dog not found: ${name}`)
    // }

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