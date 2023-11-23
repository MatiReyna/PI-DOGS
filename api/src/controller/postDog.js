const { Dog } = require('../DB_connection');
const { getAllDogs } = require('./getAllDogs');

const postDog = async (name, height, weight, life_span, image) => {

    const dogs = await getAllDogs()  // OBTENGO LA LISTA COMPLETA DE LOS PERROS

    const nameLowerCase = name.toLowerCase()  // CONVERTIMOS EL NOMBRE EN MINUSCULA

    const dogName = dogs.find(dog => dog.name.toLowerCase() === nameLowerCase)  // BUSCO SI YA EXISTE EL PERRO Y LE SACO TODOS LOS ESPACIOS EN BLANCO

    if (dogName) {
        return (`The name dog ${name} already exists`)
    } else if (!name || !height || !weight || !life_span) {
        return ('Missing information')
    } else {
        const newDog = await Dog.create({
            name: name,
            height: height,
            weight: weight,
            life_span: life_span,
            image: image
        });
        return newDog
    }
};

module.exports = {
    postDog
}