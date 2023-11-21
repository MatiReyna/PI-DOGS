const axios = require('axios');
const { API_KEY } = process.env;

const getApiDog = async () => {

    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    const apiData = await getApi.data.map((dog) => {  // SE MAPEA LA PROMESA EN LA DATA
        return {  // CREANDO UN NUEVO OBJETO CON ESTOS DATOS
            id: dog.id,
            name: dog.name,
            height: dog['height']['metric'],
            weigth: dog['width']['metric'],
            life_span: dog.life_span,
            image: dog.image.url,
            temperament: dog.temperament?.split(',').map(templete => templete.trim()).filter((item, index, self) => self.indexOf(item) === index)
            // SE DIVIDE EN UNA CADENA Y SE ELIMINA LOS DUPLICADOS
        }
    });
    return apiData;
};

module.exports = {
    getApiDog
}