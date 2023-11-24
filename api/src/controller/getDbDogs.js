const { Dog, Temperament } = require('../DB_connection');

const getDbDogs = async () => {

    const dbDog = await Dog.findAll({  // CONSULTA A LA BASE DE DATOS PARA OBTENER TODOS LOS PERROS
        include: {  // PARA INCLUIR INFO ADICIONAL A LA CONSULTA 
            model: Temperament,
            attributes: ['name'],  // SOLO SE QUIERE EL NOMBRE DEL MODELO TEMPERAMENT
            through: { attrinutes: [] }
        }
    })

    const mapDogs = dbDog.map(dog => {  // SE MAPEA PARA HACER NUEVOS OBJETOS
        return {
            id: dog.id,
            name: dog.name,
            heigth: dog.heigth,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            createDB: dog.createDB,
            temperament: dog.temperament?.map(temperament => temperament.name)  // INCLUYE EL NOMBRE DEL PRIMER TEMPERAMENTE, EN CASO DE TENER MAS
        }
    })
    return mapDogs
    //return dbDog
};

module.exports = {
    getDbDogs
}