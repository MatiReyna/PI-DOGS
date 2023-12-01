const { Router } = require('express');
const { getTemperament } = require('../controller/getTemperament');  // IMPORTAMOS LA FUNCION CONSTROLADORA

const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    try {
        const allTemperaments = await getTemperament();  // EJECUTAMOS EL CONTROLADOR DE TEMPERAMENTOS

        if (allTemperaments) {
            return res.status(200).json(allTemperaments);  // RESPONDE CON TODOS LOS TEMPERAMENTS
        } else {
            return res.status(404).json('No Temperaments found');
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });  // MANEJA EL ERROR EN CASO DE FALLA DEL SERVIDOR
    }
});

module.exports = temperamentRouter;