const express = require('express')
const router = express.Router()
const createRecipe = require('./../controllers/recipeController')
const { recipes } = require('./../middlewares/validationBody')

router.post('/create-recipe', recipes, createRecipe)

module.exports = router