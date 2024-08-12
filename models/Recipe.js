const { Schema, model } = require('mongoose')

const recetasSchema = Schema({
  recipename: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true,
    unique: true
  },
  preparation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  }
})

module.exports = model('recetas', recetasSchema)