require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Temperament } = require('../DB_connection');

const getTemperament = async () => {  // FUNCION QUE OBTIENE LOS TEMP. DE LA API Y LOS GUARDA EN DB

    const tempeDB = await Temperament.findAll();  // BUSCA TODOS LOS TEMPERAMENTOS DE LA DB

    if (tempeDB.length) { // SI HAY TEMPERAMENTOS EN LA BASE DE DATOS
        return tempeDB;  // ME LOS RETORNA
    } else {
        const tempeApiData = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data  // SE EXTRAE TODA LA INFO DE LA API

        // SE UTILIZA FLATMAP PARA CREAR UN SOLO ARRAY Y NO USAR JOIN, SE CREA UNKNOWN COMO DEFAULT
        // SE QUITAN LOS ESPACIOS DEL INICIO Y DEL FINAL CON EL TRIM

        let aux = tempeApiData.flatMap((dog) => (dog.temperament || '').split(', ').map((tempe) => tempe.trim())).filter(Boolean);

        // SET: ELIMINA TEMPERAMENTOS DUPLICADOS Y SORT LO ORDENA

        const tempsOrder = [...new Set(aux)].sort();

        // LOS CREA EN LA BASE DE DATOS
        
        const createdTemps = await Temperament.bulkCreate(
            tempsOrder.map(tempe => ({ name: tempe }))  // LO CREA CON UN OBJETO
        );
        return createdTemps.map((tempe) => tempe.name);  // RETORNA SOLO EL NAME
    }
};

module.exports = {
    getTemperament
}