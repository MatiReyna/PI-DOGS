const { Dog, Temperament } = require('../DB_connection');
// const { getAllDogs } = require('./getAllDogs');
// const { Op } = require('sequelize');
// const { getTemperament } = require('./getTemperament')
const generarUUID = require('../auxiliary/createID');

const postDog = async (name, height, weight, life_span, image, temperaments) => {

    const toFind = await Dog.findOne({
        where: {
            name: name
        }
    });

    if (toFind) {
        return 'This Dog already exists'
    } else {
        const id = generarUUID();
        const newDog = await Dog.create({
            id: id,
            name,
            height,
            weight,
            life_span,
            image,
            from: 'DB'
        });

        if (temperaments) {
            const tempeFind = await Temperament.findAll({
                where: {
                    name: temperaments
                }
            });

            await newDog.addTemperaments(tempeFind);
        }

        const dogWithTemperament = await Dog.findByPk(newDog.id, {
            include: Temperament
        });

        const temperamentName = dogWithTemperament.Temperaments.map((tempe) => tempe.name);

        return {
            id: dogWithTemperament.id,
            name: dogWithTemperament.name,
            height: dogWithTemperament?.height,
            weight: dogWithTemperament?.weight,
            life_span: dogWithTemperament.life_span,
            image: dogWithTemperament.image,
            from: dogWithTemperament.from,
            temperaments: temperamentName
        }
    }
};

module.exports = {
    postDog
}