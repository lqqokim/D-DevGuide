const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.use('/product', require('./product'));

module.exports = router;
