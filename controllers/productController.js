const Product = require('./../models/Product')

const createProduct = async (req, res) => {
  const { name, type, description, fridge, freeze, oven, stove, price, vegetarian } = req.body
  try {
    const product = await Product.findOne({ name: name })
    if (product) return res.status(400).json({
      ok: false,
      msg: `${product.name} ya existe en la base de datos!`
    })
    const dbProduct = new Product({
      name: name,
      type: type,
      description: description,
      fridge: fridge,
      freeze: freeze,
      oven: oven,
      stove: stove,
      price: price,
      vegetarian: vegetarian
    })
    await dbProduct.save()
    return res.status(201).json({
      ok: true,
      msg: `El producto "${dbProduct.name}" ha sido creado en base de datos!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    })
  }
}

module.exports = createProduct
