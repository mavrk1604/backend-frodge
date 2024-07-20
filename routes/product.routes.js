const express = require('express')
const router = express.Router()
const createProduct = require('./../controllers/productController')
const {products} = require('./../middlewares/validationBody')

router.post('/create-product', products, createProduct)

module.exports = router