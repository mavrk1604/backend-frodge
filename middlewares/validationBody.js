const { body } = require('express-validator')
const users = [
  body('email', 'Email field is required.').normalizeEmail().notEmpty(),
  body('email', 'Email address not valid.').normalizeEmail().isEmail(),
  body('password', 'Password must contain uppercase, lowercase, numbers and special characters').isStrongPassword()
]

const products = [
  body('name', 'El nombre del producto es requerido!').notEmpty(),
  body('type', 'El tipo del producto es requerido!').notEmpty(),
  body('description', 'La descripcion del producto es requerida!').notEmpty(),
  body('price', 'El precio del producto es requerido!').notEmpty(),
]

module.exports = {
  users,
  products
}