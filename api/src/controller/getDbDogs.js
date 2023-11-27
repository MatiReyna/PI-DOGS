const { Dog, Temperament } = require('../DB_connection');

const getDbDogs = async () => {

    const dbDog = await Dog.findAll({  // CONSULTA A LA BASE DE DATOS PARA OBTENER TODOS LOS PERROS
        include: {  // PARA INCLUIR INFO ADICIONAL A LA CONSULTA 
            model: Temperament,
            attributes: ['name'],  // SOLO SE QUIERE EL NOMBRE DEL MODELO TEMPERAMENT
            through: { attrinutes: [] }
        }
    });

    const mapDogs = dbDog?.map((dog) => {  // SE MAPEA PARA HACER NUEVOS OBJETOS
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            from: dog.from,
            temperament: dog.temperament?.map((tempe) => tempe.name)  // INCLUYE EL NOMBRE DEL PRIMER TEMPERAMENTE, EN CASO DE TENER MAS
        }
    });
    return mapDogs;
};

module.exports = {
    getDbDogs
}