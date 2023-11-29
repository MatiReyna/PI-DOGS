const { getApiDogs } = require('./getApiDogs');
const { getDbDogs } = require('./getDbDogs');
// const axios = require('axios');
// const { API_KEY } = process.env;
// const { Dog, Temperament } = require('../DB_connection');

const getAllDogs = async () => {  // FUNCION QUE COMBIANAN DATOS DE LA API Y DE LA DB

    const apiDog = await getApiDogs();  // SE TRAE TODOS LOS PERROS DE LA API

    const dbDog = await getDbDogs();  // SE TRAE TODOS LOS PERROS DE LA DB

    const allDogs = apiDog.concat(dbDog);  // SE CONBINAN LOS DATOS DE LA API Y LA DB

    return allDogs;  // SE RETORNA TODOS LOS PERROS

    // const dogsDb = await Dog.findAll({
    //     include: {
    //         model: Temperament,
    //         attributes: ['name'],
    //         through: {
    //             attributes: []
    //         }
    //     }
    // });

    // const dataApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;

    // const dogsApi = dataApi.map((dog) => {
    //     return {
    //         id: dog.id,
    //         name: dog.name,
    //         height: dog.height.metric,
    //         weight: dog.weight.metric,
    //         life_span: dog.life_span,
    //         image: dog.image,
    //         from: 'API',
    //         temperament: dog.temperament?.split(', ').map((tempe) => ({ 'name': tempe }))
    //     }
    // });
    // return [...dogsDb, ...dogsApi];
};

module.exports = {
    getAllDogs
}