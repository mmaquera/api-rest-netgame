'use strict'

const express = require('express')

const Game = require('../models/game')
let objResponse = require('../utils')

const router = express.Router()

router.get('/games', (req, res) => {
  Game.find({}, '_id name description image',(err, games) => {
    if (err) res.status(500).send({message: `Error al obtener datos en la base de datos: ${err}`})
    res.status(200).send(objResponse.ok(games, 'Registrado correctamente'))
  })
})

module.exports = router
