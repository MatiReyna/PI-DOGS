const express = require('express');
const morgan = require('morgan');  // MIDDLEWARE DE REGISTRO DE SOLICITUDES HTTP
const router = require('./routes/index');  // ENRUTADOR

const server = express();  // INSTANCIA DEL SERVIDOR

server.use(morgan('dev'));
server.use(express.json());  // SOLICITUDES EN FORMATO JSON
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use('/', router);  // CONFIGURACION DE RUTAS

server.use((err, req, res, next) => {  // MANEJO DE ERRORES
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = server;