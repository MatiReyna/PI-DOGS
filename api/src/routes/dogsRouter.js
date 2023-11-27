const { Router } = require('express');
const { getAllDogs } = require('../controller/getAllDogs');
const { getById } = require('../controller/getById');
const { getAllByName } = require('../controller/getAllByName');
const { getTemperament } = require('../controller/getTemperament');
const { postDog } = require('../controller/postDog');
const { Temperament, Dog } = require('../DB_connection');

const dogsRouter = Router();

dogsRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        // await getTemperament();  // OBTENEMOS LOS TEMP. EXISTENTES PARA PODER ASOCIARLOS

        if (name) {  // SI LLEGA UN PARAMETRO NAME, BUSCAMOS LOS PERROS QUE CIONCIDAN
            const dogName = await getAllByName(name);
            return res.status(200).json(dogName[0])  // ME TRAE EL OBJETO DEL PERRO Y NO EL ARRAY
        } else {
            const allDogs = await getAllDogs();  // SI NO HAY PARAMETRO BUSCAMOS TODOS LOS PERROS
            return res.status(200).json(allDogs)
        }
    } catch (error) {
        return res.status(400).send({ error: error.message })
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
        const { name, height, weight, life_span, temperament, image, from } = req.body;  // OBTENEMOS LOS DATOS DEL PERRO A AGREGAR

        if (!name || !height || !weight || !life_span || !image || !temperament) {
            throw Error('Falta informacion para crear el perro')
        } else {
            const newDog = await postDog(name, height, weight, life_span, image, temperament)
            return res.status(200).json(newDog)
        }

        // const newDog = await postDog(name, height, weight, life_span, image, temperaments)

        // //BUSCAMOS LOS OBJETOS DE TEMPERAMENTOS CORRESPONDIENTES Y LO ASOCIAMOS AL NUEVO PERRO

        // const dogTemperament = await Temperament.findAll({
        //     where: {
        //         name: temperaments
        //     }
        // })
        // await newDog.addTemperament(dogTemperament)

        // return res.status(200).json({ msg: `The dog ${newDog.name} was created with the ID: ${newDog.id}` })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
});

module.exports = dogsRouter;