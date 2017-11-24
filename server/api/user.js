'use strict'

const express = require('express')
const async = require('async')

const User = require('../models/user')
const Gamer = require('../models/gamer')
const Cabin = require('../models/cabin')

let objResponse = require('../utils')

const router = express.Router()

router.post('/user/create', (req, res) => {
  const userType = req.body.userType

  User.findOne({userName: req.body.userName}, (err, user) => {
    if (err) return res.status(500).send({message: `Error al obtener datos: ${err}`})

    if (user) return res.status(200).send(objResponse.internalServerError({}, 'El username ingresado ya existe'))

    async.series({
      saveUser: callback => {
        let user = new User()
        user.userName = req.body.userName
        user.password = req.body.password
        user.userType = userType

        user.save((err, userStored) => {
            callback(null, userStored)
        })
      }
    }, (err, results) => {
      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

      const objUser = results.saveUser

      if (userType == 1) { 
        let gamer = new Gamer()
        gamer.nickName = req.body.userName
        gamer.lastName = ''
        gamer.name = ''
        gamer.idUser = objUser._id
        gamer.save((err, gamerStored) => {
          res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))    
        })
      } else {
        let cabin = new Cabin()
        cabin.name = req.body.userName
        cabin.idUser = objUser._id
        cabin.latitude = -12.049239
        cabin.longitude = -77.042130
        cabin.save((err, cabinStored) => {
          res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
        })
      }
    })

  })

})


module.exports = router