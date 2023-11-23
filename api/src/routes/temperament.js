const { Router } = require('express');
const { getTemperament } = require('../controller/getTemperament');
const { Temperament } = require('../DB_connection');

const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    try {
        await getTemperament()  // EJECUTAMOS LA FUNCION DEL CONTROLADOR QUE TIENE LOS TEMPERAMENTOS EXISTENTES

        const allTemperaments = await Temperament.findAll()  // BUSCAMOS TODOS EN LA TABLA DE TEMPERAMENTOS

        return res.status(200).json(allTemperaments)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

module.exports = temperamentRouter;