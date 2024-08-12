const Recipe = require('./../models/Recipe')

const createRecipe = async (req, res) => {
  const { recipename, description, ingredients, preparation, category, region } = req.body
  try {
    const recipe = await Recipe.findOne({ name: name })
    if (product) return res.status(400).json({
      ok: false,
      msg: `${recipe.recipename} ya existe en la base de datos!`
    })
    const dbRecipe = new Recipe ({
      recipename: recipename,
      description: description,
      ingredients: ingredients,
      preparation: preparation,
      category: category,
      region: region
    })
    await dbRecipe.save()
    return res.status(201).json({
      ok: true,
      msg: `La receta "${dbRecipe.recipename}" ha sido creada en la base de datos!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    })
  }
}

module.exports = createRecipe
