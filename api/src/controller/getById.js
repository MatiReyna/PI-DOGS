const { getAllDogs } = require('./getAllDogs');

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

module.exports = {
    getById,
}