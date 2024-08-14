const express = require('express')
const router = express.Router()
const {createProduct, deleteProductById} = require('./../controllers/productController')

router.post('/create-product', createProduct)
router.delete('/delete-product-by-id/:id', deleteProductById)

module.exports = router