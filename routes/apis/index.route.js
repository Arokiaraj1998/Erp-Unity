const express = require('express');
const v1ApiController = require('./v1.routes');

let router = express.Router();
///Routes
router.use('/v1',  v1ApiController);


module.exports = router;