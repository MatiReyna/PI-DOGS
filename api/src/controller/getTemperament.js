require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Temperament } = require('../DB_connection');

const getTemperament = async () => {  // FUNCION QUE OBTIENE LOS TEMP. DE LA API Y LOS GUARDA EN DB

    // const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);  // HACEMOS LA PETICION A LA API

    // apiUrl.data.forEach((element) => {  // RECORRE LA PROMESA EN LA DATA
    //     if (element.temperament) {  // SI, POR CADA ELEMENTO TIENE UNA PROPIEDAD TEMPERAMENT
    //         const tempe = element.temperament.split(', ')  // SI ENCUENTRA, LO GUARDA Y LO SEPARA

    //         tempe.forEach((tempes) => {  // SE RECORRE ESA VARIABLE
    //             Temperament.findOrCreate({  // BUSCA EN (DB) Y SI NO ENCUENTRA YA UNO, LO CREA
    //                 where: { name: tempes }
    //             })
    //         });
    //     }
    // });

    // const fildTemperament = await Temperament.findAll();  // TRAE A TODOS DE LA BASE DE DATOS
    // return fildTemperament;

    const tempeDB = await Temperament.findAll();  // BUSCA TODOS LOS TEMPERAMENTOS DE LA DB

    if (tempeDB.length) {
        return tempeDB;
    } else {
        const tempeApiData = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data  // SE EXTRAE TODA LA INFO DE LA API

        // SE UTILIZA FLATMAP PARA CREAR UN SOLO ARRAY Y NO USAR JOIN, SE CREA UNKNOWN COMO DEFAULT
        // SE QUITAN LOS ESPACIOS DEL INICIO Y DEL FINAL CON EL TRIM

        let aux = tempeApiData.flatMap((dog) => (dog.temperament || '').split(', ').map((tempe) => tempe.trim())).filter(Boolean);

        // SET: ELIMINA TEMPERAMENTOS DUPLICADOS Y SORT LO ORDENA

        const tempsOrder = [...new Set(aux)].sort();

        // LOS CREA EN LA BASE DE DATOS
        const createdTemps = await Temperament.bulkCreate(
            tempsOrder.map(tempe => ({ name: tempe }))
        );
        return createdTemps.map((tempe) => tempe.name);
    }
};

module.exports = {
    getTemperament
}