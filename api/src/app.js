const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');

const server = express();  // INSTANCIA DEL SERVIDOR

server.use(morgan('dev'));
server.use(express.json());

server.use('/', router);

module.exports = server