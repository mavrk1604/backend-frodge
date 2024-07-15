const User = require('./../models/User')
const bcrypt = require('bcrypt')

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

module.exports = {
  createUser
}