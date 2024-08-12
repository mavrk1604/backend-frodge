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
    required: true,
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
    required:true
  }

})

module.exports = model('Products', productsSchema)