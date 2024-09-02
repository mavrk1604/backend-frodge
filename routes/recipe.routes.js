const express = require('express')
const router = express.Router()
const {createRecipe, deleteRecipeById, updateRecipeById, findRecipesByIngredients, findRecipeByName, getAllRecipes} = require('./../controllers/recipeController')
const { recipes } = require('./../middlewares/validationBody')
const validateFields = require('../middlewares/validationResult')

router.post('/create-recipe', recipes, validateFields, createRecipe)
router.delete('/delete/:id', deleteRecipeById)
router.patch('/update-recipe/:id', updateRecipeById)
router.get('/find-recipe-by-ingredients', findRecipesByIngredients)
router.get('/find-recipe-by-name', findRecipeByName)
router.get('/get-all-recipes/', getAllRecipes)

module.exports = router