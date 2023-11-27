const { Dog, Temperament } = require('../DB_connection');
const { getAllDogs } = require('./getAllDogs');
const { Op } = require('sequelize');
const { getTemperament } = require('./getTemperament')
const generarUUID = require('../auxiliary/createID');

const postDog = async (name, height, weight, life_span, image, temperament) => {

    const responseDb = await Dog.findAll({
        where: {
            name: name
        }
    });

    if (responseDb) {
        return ('Ya existe un perro con ese nombre')
    }

    const id = generarUUID(); 
    const newDog = await Dog.create({
        id: id,
        name: name,
        height: height,
        weight: weight,
        life_span: life_span,
        image: image,
        from: 'DB'
    });

    const TemperamentCount = await Temperament.count()

    if (TemperamentCount === 0) {
        await getTemperament()
    }

    const tempsEncontrados = await Promise.all(
        temperament.map( async (tempe) => {
            const tempEncontrado = await Temperament.findOne({
                where: {
                    name: tempe
                }
            })

            if (!tempEncontrado) {
                throw Error('Tipo de temperamento no existe')
            }
            return tempEncontrado
        })
    );

    await newDog.addTemperament(tempsEncontrados)

    return newDog

    // const dogs = await getAllDogs()  // OBTENGO LA LISTA COMPLETA DE LOS PERROS

    // const nameLowerCase = name.toLowerCase()  // CONVERTIMOS EL NOMBRE EN MINUSCULA

    // const dogName = dogs.find(dog => dog.name.toLowerCase() === nameLowerCase)  // BUSCO SI YA EXISTE EL PERRO Y LE SACO TODOS LOS ESPACIOS EN BLANCO

    // if (dogName) {
    //     return (`The name dog ${name} already exists`)
    // } else if (!name || !height || !weight || !life_span) {
    //     return ('Missing information')
    // } else {
    //     const id = generarUUID(); 
    //     const newDog = await Dog.create({
    //         id: id,
    //         name,
    //         height,
    //         weight,
    //         life_span,
    //         image,
    //         from: 'DB'
    //     });

    //     await newDog.addTemperament(Temperament)

    //     return newDog
    // }
};

module.exports = {
    postDog
}