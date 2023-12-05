const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

const getAllDogs = async () => {  // FUNCION QUE COMBIANAN DATOS DE LA API Y DE LA DB

    const apiDog = await getApiDogs();  // SE TRAE TODOS LOS PERROS DE LA API

    const dbDog = await getDbDogs();  // SE TRAE TODOS LOS PERROS DE LA DB

    const allDogs = dbDog.concat(apiDog);  // UNIMOS LA DOS FUENTES DE DATOS DE LA API Y LA DB

    return allDogs;  // SE RETORNA TODOS LOS PERROS
};

module.exports = {
    getAllDogs
}