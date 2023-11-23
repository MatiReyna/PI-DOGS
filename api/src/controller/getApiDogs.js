const axios = require('axios');
const { API_KEY } = process.env;

const getApiDogs = async () => {  // FUNCION QUE DEVUELVE UNA LISTA CON LOS PERROS DE LA API

    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)  // PETICION A LA API

    // UTILIZO EL OPERADOR "?" POR SI LA DATA DE LA API ME DA UNDEFINED
    const apiData = getApi.data?.map(dog => {  // SE MAPEA LOS DATOS QUE QUEREMOS DE LOS PERROS
        return { 
            id: dog.id,
            name: dog.name,
            height: dog.height?.metric,
            weigth: dog.weigth?.metric,
            life_span: dog.life_span,
            image: dog.image?.url,
            temperament: dog.temperament?.split(',').map(templete => templete.trim()).filter((item, index, self) => self.indexOf(item) === index)
            // SE DIVIDE EN UNA CADENA CON UNA ",". LUEGO EL MAP PARA ELIMINAR LOS ESPACION EN BLANCOS Y SE ELIMINA LOS DUPLICADOS
        }
    });
    return apiData;
};

module.exports = {
    getApiDogs
}