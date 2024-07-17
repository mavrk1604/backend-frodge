const express = require('express')
const router = express.Router()
const { createUser,userLogIn } = require('./../controllers/userController')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')

router.post('/register', users, validateFields, createUser)
router.post('/login', userLogIn)

module.exports = router