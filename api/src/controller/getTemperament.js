const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../DB_connection');

const getTemperament = async () => {

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    // ME TRAE LA PROMESA

    apiUrl.data.forEach(element => {  // RECORRE LA PROMESA EN LA DATA
        if (element.temperament) {  // SI, POR CADA ELEMENTO TIENE UNA PROPIEDAD TEMPERAMENT
            let tempe = element.temperament.split(', ')  // SI ENCUENTRA, LO GUARDA Y LO SEPARA

            tempe.forEach(element => {  // SE RECORRE ESA VARIABLE
                Temperament.findOrCreate({  // BUSCA EN (DB) Y SI NO ENCUENTRA YA UNO, LO CREA
                    where: { name: element }
                })
            });
        }
    });

    const fildTemperament = await Temperament.findAll();  // TRAE A TODOS DE LA BASE DE DATOS
    return fildTemperament;
};

module.exports = {
    getTemperament
}