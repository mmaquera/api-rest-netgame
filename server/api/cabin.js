'use strict'

const express = require('express')

const Cabin = require('../models/cabin')
let objResponse = require('../utils')

const router = express.Router()

router.get('/cabins', (req, res) => {

  Cabin.find({}, 'name address latitude longitude stateAttention', (err, cabins) => {

    if (err) res.status(500).send({message: `Error al obtener datos en la base de datos: ${err}`})

    res.status(200).send(objResponse.ok(cabins, 'Realizado satisfactoriamente'))
  })

})

module.exports = router
