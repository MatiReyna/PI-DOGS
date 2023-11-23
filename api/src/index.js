const server = require('./app');
const { conn } = require('./DB_connection');

conn.sync({ force: true }).then(() => {  // UNA VEZ TERMINADO SE PASA A FALSE
    server.listen(3001, () => { 
        console.log('Server listening on port 3001') 
    }) 
})
.catch((error) => { console.log('Error al conectar ', error) })