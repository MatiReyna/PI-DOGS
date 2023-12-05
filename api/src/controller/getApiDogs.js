require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const getApiDogs = async () => {  // FUNCION QUE DEVUELVE UNA LISTA CON LOS PERROS DE LA API

    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);  // PETICION A LA API

    const dogApi = response.data.map((dog) => {  // CON LA RESPUESTA DE LA PETICION, POR CADA PERRO CREA UN OBJETO
        return{
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image.url,
            temperaments: dog.temperament ? dog.temperament.split(',').map((t) => t.trim()) : [],  // DE SER NULL SE LE ASIGANA UN ARRAY VACIO
            from: 'API'  // LE CREO UN CAMPO PARA SABER DE DONDE VIENE
        }
    })
    return dogApi
};

module.exports = {
    getApiDogs
}

// SE ASIGNA DIVIDIENDO LA CADENA DE TEMPERAMENTOS SEPARAMOS POR COMA, Y LUEGO ELIMINA LOS ESPACIOS VACIOS CON EL MAP.