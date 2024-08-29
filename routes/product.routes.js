const express = require('express')
const router = express.Router()
const {createProduct, deleteProductById, updateProductById, findProductByName} = require('./../controllers/productController')
const { products } = require('../middlewares/validationBody')
const validateFields = require('../middlewares/validationResult')

router.post('/create-product', products, validateFields, createProduct)
router.delete('/delete-product-by-id/:id', deleteProductById)
router.patch('/update-product/:id', updateProductById)
router.get('/find-product-by-name', findProductByName)

module.exports = router
