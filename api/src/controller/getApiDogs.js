require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const getApiDogs = async () => {  // FUNCION QUE DEVUELVE UNA LISTA CON LOS PERROS DE LA API

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);  // PETICION A LA API

    const dogApi = response.data;  // ME QUEDO CON LA DATA

    const apiData = dogApi.map((dog) => {  // SE MAPEA LOS DATOS QUE QUEREMOS DE LOS PERROS
        return { 
            id: dog.id,
            name: dog.name,
            height: dog.height?.metric,
            weight: dog.weight?.metric,
            life_span: dog.life_span,
            image: dog.image?.url,
            from: 'API',
            temperament: dog.temperament?.split(', ')  // SE CREA UN ARRAY DE STRING POR CADA TEMPERAMENTO
        }
    });
    return apiData;
};

module.exports = {
    getApiDogs
}