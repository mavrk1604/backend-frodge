const Product = require('./../models/Product')


const createProduct = async (req, res) => {
  const { name, type, description, conservation, vegetarian, perishable } = req.body
  try {
    console.log(req.body)
    const product = await Product.findOne({ name: name })
    if (product) return res.status(400).json({
      ok: false,
      msg: `${product.name} ya existe en la base de datos!`
    })
    const dbProduct = new Product({
      name: name,
      type: type,
      description: description,
      conservation: conservation,
      vegetarian: vegetarian,
      perishable: perishable
    })
    await dbProduct.save()
    return res.status(201).json({
      ok: true,
      msg: `El producto ${dbProduct.name} ha sido creado en base de datos!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    })
  }
}

const deleteProductById = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) return res.status(400).json({
      ok: false,
      msg: 'No se encontró en la base de datos!'
    })

    return res.status(200).json({
      ok: true,
      msg: `${product.name} ha sido eliminado!`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    })
  }
}

const updateProductById = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const updateProduct = await Product.findOneAndUpdate({_id: id}, data, {new: true})
    return res.status(200).json ({
      ok: true,
      msg: 'Producto actualizado',
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json ({
      ok: false,
      msg: 'No se pudo actualizar'
    })
  }
}

  const findProductByName = async (req, res) => {
    try {
      const name = req.body.name
      const lowerName = name.toLowerCase()
      console.log(lowerName)
      const products = await Product.findOne({ name: lowerName });
      console.log(products)
      if(!products){
        return res.status(400).json({
          ok: false,
          msg: 'Producto no encontradO'
        })
      }
        return res.status(200).json(products)
      }catch (error) {
        console.log(error)
        return res.status(500).json({
          ok: false,
          msg: 'Por favor contacte a soporte'
        })
      }
  }

module.exports = {
  createProduct, 
  deleteProductById,
  updateProductById,
  findProductByName
}
