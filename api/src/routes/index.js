const { Router } = require('express');
const temperamentRouter = require('./temperament');
const allDogs = require('./getAllDog');

const router = Router();

router.use('/dogs', allDogs);
router.use('/temperaments', temperamentRouter)

module.exports = router