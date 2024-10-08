const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const Recipe = require('./../models/Recipe')

describe('Recipe Controllers Testing', () => {
  const testName = "nombre receta"
  const testUrl = "www.image.com/image"
  const testIngredients = ["ingredient1", "ingredient2", "ingredient3", "ingredient4"]
  const testAllergens = ["allergen1","allergen2"]
  const testPreparation = "How to prepare the recipe."
  const testCategory = "category"
  const testVegetarian = true

  const updatedData = {
    name: "nombre actualizado",
    imageurl: "www.image.com/updated-image",
    ingredients: ["ingredient5", "ingredient6"],
    allergens: ["allergen3"],
    preparation: "Updated preparation method.",
    category: "updated category",
    vegetarian: false
  }
  
  beforeEach(async () => {
    await Recipe.deleteMany({})
  }, 10000)

  afterAll(async () => {
    await Recipe.deleteMany({})
    await mongoose.connection.close()
  })

  it('Deberia agregar una nueva receta a base de datos.', async () => {
    const response = await request(app)
      .post('/api/create-recipe')
      .send({ name:testName, imageurl:testUrl, ingredients:testIngredients, allergens:testAllergens, preparation:testPreparation, category:testCategory, vegetarian:testVegetarian})

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('msg', `La receta \"${testName}\" ha sido creada en la base de datos`)
    expect(response.body).toHaveProperty('ok', true)
  })

  it('No deberia registrar una receta en base de datos si ya existe.',
    async () => {
      await new Recipe({
        name: testName,
        imageurl: testUrl,
        ingredients: testIngredients,
        allergens: testAllergens,
        preparation: testPreparation,
        category: testCategory,
        vegetarian: testVegetarian,
      }).save()
      const response = await request(app).post('/api/create-recipe').send({ name: testName, imageurl: testUrl, ingredients: testIngredients, allergens: testAllergens, preparation: testPreparation, category: testCategory, vegetarian: testVegetarian })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body).toHaveProperty('msg', `${testName} ya existe en la base de datos!`)
    })
  
  it('No deberia registar una receta si el campo de nombre esta vacio',
    async () => {
      const response = await request(app)
        .post('/api/create-recipe')
        .send({ name: "", imageurl: testUrl, ingredients: testIngredients, allergens: testAllergens, preparation: testPreparation, category: testCategory, vegetarian: testVegetarian })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body.msg.name).toHaveProperty('msg', "El nombre de la receta es requerido!")
    })
  
  it('Deberia eliminar una receta por su ID en la base de datos', async () => {
    const testRecipe = await new Recipe({
      name: testName,
      imageurl: testUrl,
      ingredients: testIngredients,
      allergens: testAllergens,
      preparation: testPreparation,
      category: testCategory,
      vegetarian: testVegetarian,
    }).save()
    
    const response = await request(app).delete(`/api/delete/${testRecipe._id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('ok', true)
    expect(response.body).toHaveProperty('msg', 'Receta eliminada correctamente')

    const deletedRecipe = await Recipe.findById(testRecipe._id)
    expect(deletedRecipe).toBeNull()
  })

  it('No deberia eliminar una receta si el ID no existe.', async () => {
    const nonExistentId = new mongoose.Types.ObjectId() // Randomly generated ID
    const response = await request(app).delete(`/api/delete/${nonExistentId}`)

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'El id es obligatorio')
  })

  it('Deberia manejar error si el formato del ID es invalido.', async () => {
    const invalidId = '12345invalid'
    const response = await request(app).delete(`/api/delete/${invalidId}`)

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'Error, por favor contacte a soporte')
  })

  it('Deberia actualizar una receta existente en la base de datos.', async () => {

    const testRecipe = await new Recipe({
      name: testName,
      imageurl: testUrl,
      ingredients: testIngredients,
      allergens: testAllergens,
      preparation: testPreparation,
      category: testCategory,
      vegetarian: testVegetarian,
    }).save()

    const updatedData = {
      name: "nombre actualizado",
      imageurl: "www.image.com/updated-image",
      ingredients: ["ingredient5", "ingredient6"],
      allergens: ["allergen3"],
      preparation: "Updated preparation method.",
      category: "updated category",
      vegetarian: false
    }

    const response = await request(app)
      .patch(`/api/update-recipe/${testRecipe._id}`)
      .send(updatedData)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('ok', true)
    expect(response.body).toHaveProperty('msg', 'Receta actualizada')

    const updatedRecipe = await Recipe.findById(testRecipe._id)
    expect(updatedRecipe.name).toBe(updatedData.name)
    expect(updatedRecipe.imageurl).toBe(updatedData.imageurl)
    expect(updatedRecipe.ingredients).toEqual(expect.arrayContaining(updatedData.ingredients))
    expect(updatedRecipe.allergens).toEqual(expect.arrayContaining(updatedData.allergens))
    expect(updatedRecipe.preparation).toBe(updatedData.preparation)
    expect(updatedRecipe.category).toBe(updatedData.category)
    expect(updatedRecipe.vegetarian).toBe(updatedData.vegetarian)
  })

  it('Deberia devolver recetas que contienen los ingredientes proporcionados', async () => {
    // Create a test recipe
    const testRecipe = await new Recipe({
      name: testName,
      imageurl: testUrl,
      ingredients: testIngredients,
      allergens: testAllergens,
      preparation: testPreparation,
      category: testCategory,
      vegetarian: testVegetarian,
    }).save()

    // Search for recipes using ingredients
    const searchIngredients = ["ingredient1", "ingredient2"]
    const response = await request(app)
      .get('/api/find-recipe-by-ingredients')
      .send({ ingredients: searchIngredients })

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].ingredients).toEqual(expect.arrayContaining(searchIngredients.map(ingredient => ingredient.toLowerCase())))
  })

  it('Deberia devolver un mensaje si no se encuentran recetas', async () => {

    const searchIngredients = ["nonexistentIngredient"]
    const response = await request(app)
      .get('/api/find-recipe-by-ingredients')
      .send({ ingredients: searchIngredients })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'No se encontraron recetas relacionadas')
  })

  it('Deberia devolver un error 500 si el cuerpo de la solicitud es incorrecto', async () => {
    const response = await request(app)
      .get('/api/find-recipe-by-ingredients')
      .send({ wrongKey: ["ingredient1", "ingredient2"] })

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'Error al buscar receta')
  })

  it('Deberia devolver una receta por su nombre', async () => {
    
    await new Recipe({
      name: testName,
      imageurl: testUrl,
      ingredients: testIngredients,
      allergens: testAllergens,
      preparation: testPreparation,
      category: testCategory,
      vegetarian: testVegetarian,
    }).save()

    
    const response = await request(app)
      .get('/api/find-recipe-by-name')
      .send({ name: testName })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', testName)
    expect(response.body).toHaveProperty('imageurl', testUrl)
  })

  it('No deberia encontrar una receta que no existe', async () => {
    const response = await request(app)
      .get('/api/find-recipe-by-name')
      .send({ name: "patas de sapo" })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'Receta no encontrada')
  })

  it('Deberia manejar errores al buscar recetas', async () => {

    jest.spyOn(Recipe, 'findOne').mockImplementationOnce(() => {
      throw new Error('Simulated error')
    })

    const response = await request(app)
      .get('/api/find-recipe-by-name')
      .send({ name: testName })

    expect(response.statusCode).toBe(500)
    expect(response.body).toHaveProperty('ok', false)
    expect(response.body).toHaveProperty('msg', 'Por favor contacte a soporte')
  })

  it('Deberia devolver todas las recetas cuando existan en la base de datos', async () => {
    const recipe1 = new Recipe({
      name: testName.toLowerCase(),
      imageurl: testUrl,
      ingredients: testIngredients,
      allergens: testAllergens,
      preparation: testPreparation,
      category: testCategory,
      vegetarian: testVegetarian
    })

    const recipe2 = new Recipe({
      name: "otra receta",
      imageurl: "www.image.com/other-image",
      ingredients: ["ingredient5", "ingredient6"],
      allergens: ["allergen3"],
      preparation: "Another recipe preparation",
      category: "another category",
      vegetarian: false
    })

    await recipe1.save()
    await recipe2.save()

    const response = await request(app)
      .get('/api/get-all-recipes')

    expect(response.statusCode).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.recipes.length).toBe(2)
    expect(response.body.recipes[0]).toHaveProperty('name', testName.toLowerCase())
    expect(response.body.recipes[1]).toHaveProperty('name', 'otra receta')
  })

  it('Deberia devolver un error 404 si no existen recetas en la base de datos', async () => {
    await Recipe.deleteMany({})

    const response = await request(app)
      .get('/api/get-all-recipes')

    expect(response.statusCode).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.msg).toBe('No products found in the database!')
  })

  it('Deberia manejar errores del servidor al obtener todas las recetas', async () => {
    jest.spyOn(Recipe, 'find').mockImplementationOnce(() => {
      throw new Error('Simulated database error')
    })

    const response = await request(app)
      .get('/api/get-all-recipes')

    expect(response.statusCode).toBe(500)
    expect(response.body.ok).toBe(false)
    expect(response.body.msg).toBe('Server error, please contact support.')
  })

})
