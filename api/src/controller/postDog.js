const { Dog, Temperament } = require('../DB_connection');
const { Op } = require('sequelize');  // PARA REALIZAR COMPARACION EN CONSULTA

const postDog = async (name, height, weight, life_span, image, temperaments) => {  // FUNCION QUE CREA UN PERRO

    const toFind = await Dog.findOne({  // BUSCA EN LA DB SI YA HAY UN PERRO CON ESE NOMBRE
        where: {
            name: name
        }
    });

    if (toFind) {  // SI LO ENCUENTRA
        return 'This Dog already exists'
    } else {  // CASO CONTRARIO, LO CREA EN LA DB
        const newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
            from: 'DB'
        });

        if (temperaments) {  // SI TENGO TEMPERAMENTS A LA HORA DE CREAR EL PERRO
            const tempeFind = await Temperament.findAll({  // SE BUSCA EN LA DB SI YA ESTAN
                where: {
                    name: {
                        [Op.in]: temperaments  // BUSCAR TEMP. EXISTENTES 
                    }
                }
            });

            await newDog.setTemperaments(tempeFind);  // Y SE LO ASOCIA AL PERRO CREADO
        }

        const dogWithTemperament = await Dog.findByPk(newDog.id, {  // BUSCA EL PERRO RECIEN CREADO POR ID 
            include: Temperament  // LE INCLUYE LOS TEMPERAMENTOS 
        });

        const temperamentName = dogWithTemperament.Temperaments.map((tempe) => tempe.name);  // EXTRAE LOS NOMBRES DE LOS TEMPERAMENTOS DEL PERRO RECIEN CREADO

        return {  // RETORNA UN OBJETO CON LA INFORMACION DEL PERRO CREADO
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