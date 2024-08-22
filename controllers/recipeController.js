const { products } = require('../middlewares/validationBody')
const Recipe = require('./../models/Recipe')

const createRecipe = async (req, res) => {
  const { name, imageurl, ingredients, allergens, preparation, category, vegetarian } = req.body
  try {
    const recipe = await Recipe.findOne({ name: name })
    if (recipe) return res.status(400).json({
      ok: false,
      msg: `${recipe.name} ya existe en la base de datos!`
    })
    const dbRecipe = new Recipe ({
      name: name,
      imageurl: imageurl,
      ingredients: ingredients,
      allergens: allergens,
      preparation: preparation,
      category: category,
      vegetarian: vegetarian
    })
    await dbRecipe.save()
    return res.status(201).json({
      ok: true,
      msg: `La receta ${dbRecipe.name} ha sido creada en la base de datos`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    })
  }
}

const deleteRecipeById = async (req, res) => {
  const id = req.params.id
  try {
    const recipe = await Recipe.findByIdAndDelete(id)
    if(!recipe) {
      return res.status(400).json({
        ok: false,
        msg: 'El id es obligatorio'
      })
    }
    return res.status(200).json({
      ok: true,
      msg: 'Producto eliminado correctamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un eror'
    })
  }
}

const updateRecipeById = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const updateRecipe = await Recipe.findOneAndUpdate({_id: id}, data, {new: true})
    return res.status(200).json ({
      ok: true,
      msg: 'Receta actualizada',
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json ({
      ok: false,
      msg: 'No se pudo actualizar'
    })
  }
}

const findRecipes = async (req, res) => {
  try {
    const ingredients = req.body.ingredients
    console.log(ingredients)
    const recipes = await Recipe.find({ ingredients: { $all: ingredients } });

    console.log(recipes)
    if(recipes.length===0) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontraron recetas relacionadas'
      })
    }
    res.status(200).json(recipes)
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al buscar receta'
    })
  }
};




module.exports = { createRecipe, deleteRecipeById, updateRecipeById, findRecipes }