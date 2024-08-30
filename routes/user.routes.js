const express = require('express')
const router = express.Router()
const { createUser, userLogIn, addIngredientById, deleteIngredientById } = require('./../controllers/userController')
const {users} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')

router.post('/register', users, validateFields, createUser)
router.post('/login', userLogIn)
router.put('/add-ingredient/:id', addIngredientById)
router.put('/remove-ingredient/:id', deleteIngredientById)

module.exports = router