const server = require('./app');  // IMPORTA EL SERVIDOR
const { conn } = require('./DB_connection');  // IMPORTA LA CONEXION A LA DB

conn.sync({ force: true }).then(() => {  // UNA VEZ TERMINADO SE PASA A FALSE
    server.listen(3001, () => {
        console.log('Server listening on port 3001')
    })
})
    .catch((error) => { console.log('Error al conectar ', error) })

// SINCRONIZAMOS LA BASE DE DATOS conn.sync({ force:true }) INDICA QUE SE RECREA LA DB EN CADA REINICIO DEL SERVIDOR
// LEVANTAMOS EL SERVIDOR EN EL PUERTO 3001