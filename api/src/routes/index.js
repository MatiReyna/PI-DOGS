const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentRouter = require('./temperament');

const router = Router();

// CONFIGURAR LOS ROUTER

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentRouter);

module.exports = router;