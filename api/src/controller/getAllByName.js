const { getAllDogs } = require('./getAllDogs');

const getAllByName = async (name) => {

    const allDogs = await getAllDogs()  // OBTENEMOS LA LISTA COMPLETA DE LOS PERROS

    const filterName = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
    // FILTRAMOS LOS PERROS QUE CONTIENE EL NAME POR PARAMETRO EN SU NOMBRE

    if (filterName.length > 0) {  // EL FILTER DA UN ARRAY POR LO QUE SI ES MAYOR A 0 SIGNIFICA QUE HAY
        return filterName
    } else {
        return (`Dog not found: ${name}`)
    }
};

module.exports = {
    getAllByName
}