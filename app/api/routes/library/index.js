const express = require('express');
const router = express.Router();

router.use('/video', require('./video'));
router.use('/download', require('./download'));
router.use('/document', require('./document'));

module.exports = router;
