const express = require('express');
const createError = require('http-errors');
const router = express.Router();

/**
 * Global Router
 */

router.use('/auth', require('./auth'));
router.use('/docs', require('./docs'));
router.use('/library', require('./library'));
router.use('/forum', require('./forum'));

module.exports = router;
