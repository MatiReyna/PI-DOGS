const { Router } = require('express');
const { getAllDogs } = require('../controller/getAllDogs');
const { getById } = require('../controller/getById');
const { getAllByName } = require('../controller/getAllByName');
const { getTemperament } = require('../controller/getTemperament');
const { postDog } = require('../controller/postDog');
const { Temperament } = require('../DB_connection');

const dogsRouter = Router();

dogsRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query

        await getTemperament()  // OBTENEMOS LOS TEMP. EXISTENTES PARA PODER ASOCIARLOS

        if (name) {  // SI LLEGA UN PARAMETRO NAME, BUSCAMOS LOS PERROS QUE CIONCIDAN
            const dogName = await getAllByName(name)
            return res.status(200).json(dogName[0])  // ME TRAE EL OBJETO DEL PERRO Y NO EL ARRAY
        } else {  // SI NO HAY PARAMETRO BUSCAMOS TODOS LOS PERROS
            const allDogs = await getAllDogs()
            return res.status(200).json(allDogs)
        }
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
});

dogsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const dogFind = await getById(id)

        return res.status(200).json(dogFind)
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
});

dogsRouter.post('/create', async (req, res) => {
    try {
        await getTemperament()  // OBTENEMOS LOS TEMPERAMENTOS EXISTENTES PARA ASOCIARLOS

        const { name, height, weight, life_span, image, Temperaments } = req.body  // OBTENEMOS LOS DATOS DEL PERRO A AGREGAR

        if (Temperaments.length === 0) {
            return('The dog has to have at least one temperament')
        }

        // CREAMOS UN NUEVO PERRO CON LA TABLA DE PERROS
        const newDog = await postDog(name, height, weight, life_span, image)

        //BUSCAMOS LOS OBJETOS DE TEMPERAMENTOS CORRESPONDIENTES Y LO ASOCIAMOS AL NUEVO PERRO
        const dogTemperament = await Temperament.findAll({
            where: {
                name: Temperaments
            }
        })
        await newDog.addTemperament(dogTemperament)

        return res.status(200).json({ msg: `The dog ${newDog.name} was created with the ID: ${newDog.id}`})
    } catch (error) {
        
    }
});

module.exports = dogsRouter;