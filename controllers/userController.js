const User = require('./../models/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('./../middlewares/jwtGenerate')

const createUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (user) return res.status(400).json({
      ok: false,
      msg: `${email} is already in use!`
    })
    const salt = bcrypt.genSaltSync()
    const dbUser = new User({
      email: email,
      password: password
    })
    dbUser.password = bcrypt.hashSync(password, salt)
    await dbUser.save()
    return res.status(201).json({
      ok: true,
      msg: `${email} has been registered successfully!`
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact support.'
    })
  }
}

const userLogIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const dbUser = await User.findOne({ email })
    if (!dbUser) return res.status(400).json({
      ok: false,
      msg: `User doesn't exist.`
    })
    const validatePassword = bcrypt.compareSync(password, dbUser.password)
    if (!validatePassword) return res.status(400).json({
      ok: false,
      msg: `Password incorrect.`
    })
    const token = await generateToken(dbUser._id, dbUser.email)

    return res.status(200).json({
      ok: true,
      msg: `${dbUser.email} Bienvenido a Frodge!`,
      token: token
    })
  } catch(error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact support.'
    })
  }
}

module.exports = {
  createUser,
  userLogIn
}