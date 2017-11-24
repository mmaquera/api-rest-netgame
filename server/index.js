'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const api = require('./api')
const middleware = require('./middleware')
const config = require('./config')

const app = express()
const port = config.port

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/v1', api.authorize)
app.use('/api/v1', api.user)

app.use(middleware.middlewareCors)
app.use(middleware.middlewareAuthorized)

app.use('/api/v1', api.game)
app.use('/api/v1', api.publication)
app.use('/api/v1', api.comment)
app.use('/api/v1', api.event)
app.use('/api/v1', api.cabin)
app.use('/api/v1', api.userCabin)
app.use('/api/v1', api.userGamer)

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectarse a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida')

  app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto http://localhost:${port}`)
  })
})
