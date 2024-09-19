const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')

describe('User Controller Testing', () => {
  beforeEach(async() => {
    await User.deleteMany({})
    console.log('BeforeEach Ejecutado')
  }, 10000)

  afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
    console.log('AfterAll ejecutado y conexion cerrada.')
  })

  it('Deberia registrar un nuevo usuario si no existe ya en la base de datos.', async () => {
    const email = 'test@test.com'
    console.log('Supertest va a hacer la peticion POST')
    const response = await request(app)
      .post('/api/register')
      .send({ email: email, password: 'Test1234!' })
    // console.log('Supertest ya finalizo, la espuesta es', response)
    
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('msg', `${ email } has been registered successfully!`)
    expect(response.body).toHaveProperty('ok', true)
  })

  it('No deberia registrar un nuevo usuario en base de datos si ya existe.',
    async () => {
      await new User({
        email: 'test@test.com',
        password: 'Test1234!'
      }).save()
      const response = await request(app).post('/api/register').send({ email: 'test@test.com', password: 'Test1234!' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body).toHaveProperty('msg', `test@test.com is already in use!`)
    })
  
  it('No deberia registar un usuario si el campo de email esta vacio',
    async () => {
      const response = await request(app).post('/api/register').send({ email: '', password: 'Test1234!' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body.msg.email).toHaveProperty('msg', "Email field is required.")
    })
  
  it('No deberia registar un usuario si el correo no esta en el formato correcto',
    async () => {
      const response = await request(app).post('/api/register').send({ email: 'correo', password: 'Test1234!' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body.msg.email).toHaveProperty('msg', "Email address not valid.")
    })
  
  it('No deberia registar un usuario si la contrasena no es fuerte.',
    async () => {
      const response = await request(app).post('/api/register').send({ email: 'test@test.com', password: 'password' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('ok', false)
      expect(response.body.msg.password).toHaveProperty('msg', "Password must contain uppercase, lowercase, numbers and special characters.")
    })
})