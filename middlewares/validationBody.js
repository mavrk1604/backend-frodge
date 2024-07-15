const { body } = require('express-validator')
const users = [
  body('email', 'Email field is required.').normalizeEmail().notEmpty(),
  body('email', 'Email address not valid.').normalizeEmail().isEmail(),
  body('password', 'Password must contain uppercase, lowercase, numbers and special characters').isStrongPassword()
]

module.exports = users