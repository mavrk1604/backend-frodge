const express = require('express')
const router = express.Router()
const { createUser } = require('./../controllers/userController')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')

router.post('/register', users, validateFields, createUser)

module.exports = router