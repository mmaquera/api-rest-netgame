'use strict'

const express = require('express')
const moment = require('moment')

const Comment = require('../models/comment')

let objResponse = require('../utils')

const router = express.Router()

router.post('/comment/create', (req, res) => {
  
  let comment = new Comment()
  comment.description = req.body.description
  comment.date = moment().format()
  comment.idUser = req.sessionInformation.idUser
  comment.idPublication = req.body.idPublication
  comment.save((err, comment) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
    res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
  })

})

module.exports = router