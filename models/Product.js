const { Schema, model } = require('mongoose')

const productsSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    unique: true
  },
  information: {
    type: String,
    required: false,
  },
  fridge: {
    type: Boolean,
    required: true
  },
  freeze: {
    type: Boolean,
    required: true
  },
  oven: {
    type: Boolean,
    required: true
  },
  stove: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  vegetarian: {
    type: Boolean,
    required: true
  }

})
const Product = model('Products', productsSchema)
module.exports = Product