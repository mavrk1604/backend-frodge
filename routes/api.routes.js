const express = require('express');
const router = express.Router();
const user = require('./user.routes')
const file = require('./file.routes')
const product = require('./product.routes')

router.use('/api', user)
router.use('/api', file)
router.use('/api', product)


module.exports = router