'use strict'

const express = require('express')

const Gamer = require('../models/gamer')
let objResponse = require('../utils')

const router = express.Router()

router.get('/user/gamer', (req, res) => {
  Gamer.findOne({idUser: req.sessionInformation.idUser}, 'name lastName nickName', (err, gamer) => {
    if (err) res.status(500).send({message: `Error al obtener datos: ${err}`})
    console.log(gamer)
    res.status(200).send(objResponse.ok(gamer, 'Actualizado correctamente'))
  })
})

router.put('/user/gamer', (req, res) => {
  Gamer.findOne({idUser: req.sessionInformation.idUser}, (err, gamer) => {
    if (err) res.status(500).send({message: `Error al obtener datos: ${err}`})

    gamer.name = req.body.name
    gamer.lastName = req.body.lastName
    gamer.nickName = req.body.nickName
    gamer.save((err, gamerUpdate) => {
      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

      res.status(200).send(objResponse.ok({}, 'Actualizado correctamente'))
    })
  })
})

module.exports = router