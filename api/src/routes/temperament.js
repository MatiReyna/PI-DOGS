const { Router } = require('express');
const { getTemperament } = require('../controller/getTemperament');  // IMPORTAMOS LA FUNCION CONSTROLADORA
const { Temperament } = require('../DB_connection');  // IMPORTAMOS EL MODELO DE LA BASE DE DATOS

const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    try {
        // await getTemperament();  // EJECUTAMOS LA FUNCION DEL CONTROLADOR QUE TIENE LOS TEMPERAMENTOS EXISTENTES

        const allTemperaments = await getTemperament();  // BUSCAMOS TODOS EN LA TABLA DE TEMPERAMENTOS

        return res.status(200).json(allTemperaments);  // RESPONDE CON TODOS LOS TEMPERAMENTS
    } catch (error) {
        return res.status(404).send({ error: error.message });
    }
});

module.exports = temperamentRouter;