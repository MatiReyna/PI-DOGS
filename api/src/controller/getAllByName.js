const { getAllDogs } = require('./getAllDogs');

const getAllByName = async (name) => {  // FUNCION QUE DEVUELVE EL PERRO CON EL NAME PASADO POR PARAMETRO

    const allDogs = await getAllDogs();  // OBTENEMOS LA LISTA COMPLETA DE LOS PERROS

    // FILTRAMOS LOS PERROS QUE CONTIENE EL NAME POR PARAMETRO EN SU NOMBRE

    const filterName = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));

    if (filterName.length) {  // EL FILTER DA UN ARRAY POR LO QUE SI ES MAYOR A 0 SIGNIFICA QUE HAY
        return filterName
    } else {
        return (`Dog not found: ${name}`)
    }
};

module.exports = {
    getAllByName
}