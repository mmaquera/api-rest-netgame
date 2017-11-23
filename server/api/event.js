'use strict'

const express = require('express')
const async = require('async')

const Event = require('../models/event')
const Cabin = require('../models/cabin')
const Assistance = require('../models/assistance')

let objResponse = require('../utils')

const router = express.Router()


router.get('/game/events/:idGame', (req, res) => {

  async.series({
    getEvents: callbackAsync => {
      Event.find({idGame: req.params.idGame}, (err, events) => {
        if (err) return callbackAsync(new Error('El codigo del usuario y del juego'))
        callbackAsync(null, events)
      })
    }
  }, (err, results) => {
    let events = results.getEvents

    let result = []

    async.eachSeries(events, (event, callback) => {
      Cabin.findOne({idUser: event.idUser}, (err, cabin) => {
        let obj = {
          _id: event._id,
          title: event.title,
          description: event.description,
          dateEvent: event.dateEvent,
          dateStart: event.dateStart,
          dateEnd: event.dateEnd,
          latitude: cabin.latitude,
          longitude: cabin.longitude,
          name: cabin.name,
          flag: 0
        }

        if (event.idUser === req.sessionInformation.idUser){
          obj.flag = 1
        }

        result.push(obj)
        callback()
      })
    }, (err, results) => {
      res.status(200).send(objResponse.ok(result, 'Realizado satisfactoriamente'))
    })
  })
  
})

router.post('/game/event/create', (req, res) => {

  let event = new Event()
  event.title = req.body.title
  event.description = req.body.description
  event.dateEvent = req.body.dateEvent
  event.dateStart = req.body.dateStart
  event.dateEnd = req.body.dateEnd
  event.idGame = req.body.idGame
  event.idUser = req.sessionInformation.idUser
  event.save((err, eventStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
  })

})

router.post('/game/event/assistance',(req, res) => {
  Assistance.findOne({idUser: req.sessionInformation.idUser, idEvent: req.body.idEvent}, (err, assistance) => {

    if (assistance){
      assistance.state = req.body.state
      assistance.save((err, assistanceUpdate) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })

    } else {
      const assistanceInsert = new Assistance()
      assistanceInsert.state = req.body.state
      assistanceInsert.idUser = req.sessionInformation.idUser
      assistanceInsert.idEvent = req.body.idEvent
      assistanceInsert.save((err, assistanceStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).send(objResponse.ok({}, 'Registrado correctamente'))
      })
    }
  })
})

module.exports = router
