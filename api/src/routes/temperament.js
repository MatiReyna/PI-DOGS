const { Router } = require('express');
const { getTemperament } = require('../controller/tempcontoller');

const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    try {
        const allTemperament = await getTemperament()
        return res.status(200).json(allTemperament)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

module.exports = temperamentRouter;