const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('./db/config')
databaseConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(8080, () => {
  console.log(`Servidor conectado en el puerto ${port}!`)
})