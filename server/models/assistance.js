'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AssistanceSchema = Schema({
  idEvent: String,
  idUser: String,
  state: Number,
}, { collection: 'Assistance' })

module.exports = mongoose.model('Assistance', AssistanceSchema)