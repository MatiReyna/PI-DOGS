const axios = require('axios');
const { API_KEY } = process.env;
const { Temperament } = require('../DB_connection');

const getTemperament = async () => {  // FUNCION QUE OBTIENE LOS TEMP. DE LA API Y LOS GUARDA EN DB

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);  // HACEMOS LA PETICION A LA API

    apiUrl.data.forEach((element) => {  // RECORRE LA PROMESA EN LA DATA
        if (element.temperament) {  // SI, POR CADA ELEMENTO TIENE UNA PROPIEDAD TEMPERAMENT
            const tempe = element.temperament.split(', ')  // SI ENCUENTRA, LO GUARDA Y LO SEPARA

            tempe.forEach((tempes) => {  // SE RECORRE ESA VARIABLE
                Temperament.findOrCreate({  // BUSCA EN (DB) Y SI NO ENCUENTRA YA UNO, LO CREA
                    where: { name: tempes }
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