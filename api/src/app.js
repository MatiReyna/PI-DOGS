const express = require('express');
const morgan = require('morgan');

const server = express();  // INSTANCIA DEL SERVIDOR

// INSTANCIAMOS LOS MIDDLEWARE

server.use(morgan('dev'));
server.use(express.json());

// server.use('/(ACA VA LA URL)', router)

module.exports = server
