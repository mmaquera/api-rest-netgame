'use strict'

const express = require('express')

const Cabin = require('../models/cabin')
let objResponse = require('../utils')

const router = express.Router()

router.get('/user/cabin', (req, res) => {
  Cabin.findOne({idUser: req.sessionInformation.idUser}, 'address latitude longitude stateAttention',(err, cabin) => {
    if (err) res.status(500).send({message: `Error al obtener datos: ${err}`})

    res.status(200).send(objResponse.ok(cabin, 'Actualizado correctamente'))
  })
})

router.put('/user/cabin', (req, res) => {
  Cabin.findOne({idUser: req.sessionInformation.idUser}, (err, cabin) => {

    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    cabin.address = req.body.address
    cabin.stateAttention = req.body.stateAttention

    cabin.save((err, cabinUpdate) => {
      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

      res.status(200).send(objResponse.ok({}, 'Actualizado correctamente'))
    })

  })
})

router.put('/user/cabin/location', (req, res) => {
  Cabin.findOne({idUser: req.sessionInformation.idUser}, (err, cabin) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    cabin.latitude = req.body.latitude
    cabin.longitude = req.body.longitude

    cabin.save((err, cabinUpdate) => {

      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

      res.status(200).send(objResponse.ok({}, 'Actualizado correctamente'))
    })

  })
})

module.exports = router
