const { getAllDogs } = require('./getAllDogs');
// const { Dog, Temperament } = require('../DB_connection');

const getById = async (id) => {  // FUNCION QUE DEVULEVE EL PERRO CON EL ID QUE SE PASO POR PARAMETRO

    const allDogs = await getAllDogs();  // OBTENEMOS LA LISTA COMPLETA DE LOS PERROS

    // FILTRAMOS EL PERRO CON EL ID ESPECIFICADO

    const filterDog = allDogs.filter((dog) => dog.id == id);

    if (filterDog.length > 0) {
        return filterDog[0]
    } else {
        return ('Dog not found')
    }
};

// const getByIdDB = async (id) => {

//     const searchDog = await Dog.findByPk(id, {
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: []
//             }
//         }
//     });
//     return searchDog;
// };

module.exports = {
    getById,
}