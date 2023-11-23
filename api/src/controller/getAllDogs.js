const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');

const getAllDogs = async () => {

    const apiDog = await getApiDogs()

    let dbDog = await getDbDogs()

    const allDogs = apiDog.concat(dbDog)  // SE CONBINAN LOS DATOS DE LA API Y LA DB

    return allDogs
};

module.exports = {
    getAllDogs
}