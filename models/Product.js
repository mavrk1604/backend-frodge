const { Schema, model } = require('mongoose')

const productsSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  conservation: {
    type: String,
    required: true,
  },
  vegetarian: {
    type: Boolean,
  }

})
const Product = model('Products', productsSchema)
module.exports = Product