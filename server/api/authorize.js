'use strict'

const express = require('express')

const services = require('../services')
const User = require('../models/user')
let objResponse = require('../utils')

const router = express.Router()

router.post('/authorize', (req, res) => {

  User.findOne({userName: req.body.userName, password: req.body.password}, (err, user) => {
    
    if (err) return res.status(500).send(objResponse.internalServerError({}, `Error al realizar la peticion ${err}`))
    if (!user) return res.status(200).send(objResponse.internalServerError({},'Usuario o contraseña invalida'))
    
    const token = services.createToken({_id: user._id, userName: user.userName})

    res.status(200).send(objResponse.authorize(token, user.userType,'Ingreso satisfactorio'))
    
  })
  
})

module.exports = router