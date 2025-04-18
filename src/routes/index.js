const express = require('express');
const { getAverage } = require('../controllers/averageController');
const router = express.Router();

router.post('/average', getAverage);

module.exports = router;