const { Router } = require('express');
const { getAllDog } = require('../controller/getAllDog');

const allDogs = Router();

allDogs.get('/', async (req, res) => {
    try {
        const { name } = req.query
        const allDog = await getAllDog()

        if (name) {
            const dogName = await allDog.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
            // FILTRA LA LISTA DE PERROS PARA PODER ENCONTRAR EL QUE SE PASO POR NOMBRE EN EL PARAMENTRO DE CONSULTA

            dogName.length ? res.status(200).json(dogName) : res.status(404).send({ msg: 'dog not found' })
        } else {
            return res.status(200).json(allDog)
        }
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});

module.exports = allDogs