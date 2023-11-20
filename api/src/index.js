const server = require('./app');
const { conn } = require('./DB_connection');

conn.sync({ force: true })
.then(() => {
    server.listen(3000, () => { console.log('Server listening on port 3000') }) 
})
.catch((error) => { console.log('Error al conectar ', error) })



// ACA SOLO ESCUCHA Y HACEMOS LA SINCRONIZACION A LA BASE DE DATOS