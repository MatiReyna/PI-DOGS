const { getApiDog } = require('./getApiDog');
const { getDbDog } = require('./getDbDog');

const getAllDog = async () => {

    const apiDog = await getApiDog()

    let dbDog = await getDbDog()

    const allDogs = apiDog.concat(dbDog)  // SE CONBINAN LOS DATOS DE LA API Y LA DB EN UN SOLO ARRAY

    return allDogs
};

module.exports = {
    getAllDog
}