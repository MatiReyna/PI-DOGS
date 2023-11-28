const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

const getAllDogs = async () => {  // FUNCION QUE COMBIANAN DATOS

    const apiDog = await getApiDogs();  // SE TRAE TODOS LOS PERROS DE LA API

    const dbDog = await getDbDogs();  // SE TRAE TODOS LOS PERROS DE LA DB

    const allDogs = apiDog.concat(dbDog);  // SE CONBINAN LOS DATOS DE LA API Y LA DB

    return allDogs;  // SE RETORNA TODOS LOS PERROS
};

module.exports = {
    getAllDogs
}