const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.use('/login', require('./login'));
router.use('/gw', require('./gw'));
router.use('/dbs', require('./dbs'));
router.use('/token', require('./token'));
router.use('/user', require('./user'));

module.exports = router;
