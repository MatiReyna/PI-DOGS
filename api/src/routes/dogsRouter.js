const { Router } = require('express');
const { getAllDogs } = require('../controller/getAllDogs');
const { getById } = require('../controller/getById');
const { getAllByName } = require('../controller/getAllByName');
const { getTemperament } = require('../controller/getTemperament');
const { postDog } = require('../controller/postDog');

const dogsRouter = Router();

dogsRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        await getTemperament();  // OBTENEMOS LOS TEMP. EXISTENTES PARA PODER ASOCIARLOS

        if (name) {  // SI LLEGA UN PARAMETRO NAME, BUSCAMOS LOS PERROS QUE CIONCIDAN
            const dogName = await getAllByName(name);
            return res.status(200).json(dogName);  // ME TRAE EL OBJETO DEL PERRO Y NO EL ARRAY
        } else {
            const allDogs = await getAllDogs();  // SI NO HAY PARAMETRO BUSCAMOS TODOS LOS PERROS
            return res.status(200).json(allDogs);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

dogsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const dogFind = await getById(id);

        return res.status(200).json(dogFind)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
});

dogsRouter.post('/', async (req, res) => {
    try {
        const { name, height, weight, life_span, image, temperaments } = req.body;

        if (!name || !height || !weight || !life_span || !image) {
            return res.status(400).json({ error: 'Missing required fields' });
        } else {
            const newDog = await postDog(name, height, weight, life_span, image, temperaments)
            return res.status(201).json(newDog); // STATUS CODE 201 SIGNIFICA CREATE
        }
    } catch(error) {
        return res.status(500).json({ error: error.message });
    };
});

module.exports = dogsRouter;