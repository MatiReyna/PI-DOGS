require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const getApiDogs = async () => {  // FUNCION QUE DEVUELVE UNA LISTA CON LOS PERROS DE LA API

    const getApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;  // PETICION A LA API

    // UTILIZO EL OPERADOR "?" POR SI LA DATA DE LA API ME DA UNDEFINED

    const apiData = getApi.map((dog) => {  // SE MAPEA LOS DATOS QUE QUEREMOS DE LOS PERROS
        return { 
            id: dog.id,
            name: dog.name,
            height: dog.height?.metric,
            weight: dog.weight?.metric,
            life_span: dog.life_span,
            image: dog.image?.url,
            from: 'API',
            temperament: dog.temperament?.split(', ').map((tempe) => ({ 'name': tempe })),  // SE CREA UN OBJETO POR CADA TEMPERAMENTO
        }
    });
    return apiData;
};

module.exports = {
    getApiDogs
}