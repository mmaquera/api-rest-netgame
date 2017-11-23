'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = Schema({
  title: String,
  description: String,
  dateStart: String,
  dateEnd: String,
  dateEvent: String,
  state: { type: Number, default: 1 },
  idUser: String,
  idGame: String
}, { collection: 'Event' })

module.exports = mongoose.model('Event', EventSchema)