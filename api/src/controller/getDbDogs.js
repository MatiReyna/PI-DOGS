const { Dog, Temperament } = require('../DB_connection');

const getDbDogs = async () => {  // CONSULTA A LA BASE DE DATOS PARA OBTENER TODOS LOS PERROS

    const dbDog = await Dog.findAll({  // BUSCA PERROS EN LA DB
        include: {  // PARA INCLUIR INFO ADICIONAL DEL MODELO TEMPERAMENT
            model: Temperament,
            attributes: ['name'],  // SOLO SE QUIERE EL NOMBRE DEL MODELO TEMPERAMENT
            through: {  // SE UTILIZA PARA ESPECIFICAR LA TABLA INTERMEDIA
                attributes: []  // PARA NO INCLUIR NINGUNA PROPIEDAD DE LA TABLA INTERMEDIA
            }
        }
    });
    return dbDog.map((d) => {  // MAPEA EL PERRO ENCONTRADO Y CREA UN OBJETO PARA MOSTRAR
        return {
            id: d.id,
            name: d.name,
            height: d.height,
            weight: d.weight,
            life_span: d.life_span,
            image: d.image,
            temperaments: d.Temperaments.map((t) => t.name),  // SOLO SE QUEDA CON EL NOMBRE
            from: 'DB'
        }
    });
};

module.exports = {
    getDbDogs
}