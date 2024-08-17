const Recipe = require('./../models/Recipe')

const createRecipe = async (req, res) => {
  const { recipename, description, ingredients, allergens, preparation, category, region } = req.body
  try {
    const recipe = await Recipe.findOne({ recipename: recipename })
    if (recipe) return res.status(400).json({
      ok: false,
      msg: `${recipe.recipename} ya existe en la base de datos!`
    })
    const dbRecipe = new Recipe ({
      recipename: recipename,
      description: description,
      ingredients: ingredients,
      allergens: allergens,
      preparation: preparation,
      category: category,
      region: region
    })
    await dbRecipe.save()
    return res.status(201).json({
      ok: true,
      msg: `La receta ${dbRecipe.recipename} ha sido creada en la base de datos`
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

// const findRecipes = async(req, res) => {
//   try {
//     const names = req.body.names
//     console.log(names)
//     const recipes = await Recipe.find({ ingredients: { $in: names } })
//     if(!recipes) {
//       return res.status(400).json({
//         ok: false,
//         msg: 'No se encontraron recetas con estos productos'
//       })
//     }
//     return res.status(200).json({
//       ok: true,
//       msg: "lkjasnfdlsadknfsdlknfldkfjldskvlsdkjnvkjsñdanflksndvkjsdfnsdjvnkjwavnjkacnsdlkjvnsdlkjcvndfkjnvdsñkj"
//     })
//   }
//   catch(error){
//     console.log(error)
//   }
// }

const findRecipes = async (req, res) => {
  try {
      const { ingredientes } = req.body; // Array de ingredientes
      
      // Verificamos que se hayan enviado ingredientes
      if (!ingredientes || !ingredientes.length) {

          return res.status(400).json({
            ok: true,
            message: 'Se requiere un array de ingredientes.' 
          })

      }

      // Buscamos productos que contengan todos los ingredientes especificados
      const products = await Product.find({ 
          ingredientes: { $all: ingredientes }
      });

      if (products.length === 0) {
          return res.status(404).json({ 
            ok: false, 
            msg: 'No se encontraron productos con los ingredientes especificados.' 
          });
      }

      return res.json(products);
  } catch (error) {
      console.error(error);

      return res.status(500).json({ 
        ok: false,
        message: 'Error en el servidor.' 
      });

  }
};




module.exports = {createRecipe, deleteRecipeById, updateRecipeById, findRecipes }