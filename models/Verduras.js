const { Schema, model } = require('mongoose')
const verdurasSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    require: true,
    unique: true
  },
  refrigerable: {
    type: Boolean,
    require: true
  },
  price: {
    type: Number,
    require: true,
  }


})

module.exports = model('Verduras', verdurasSchema)