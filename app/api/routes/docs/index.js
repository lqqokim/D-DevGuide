const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.use('/product', require('./product'));
router.use('/repository', require('./repository'));
router.use('/mergeRequest', require('./mergeRequest'));
router.use('/commit', require('./commit'));
router.use('/branch', require('./branch'));
router.use('/version', require('./version'));
router.use('/notice', require('./notice'));
router.use('/search', require('./search'));

module.exports = router;
