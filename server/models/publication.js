'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = Schema({
  title: String,
  description: String,
  dateRegister: String,
  idGame: String,
  idUser: String,
  state: {type: Number, default: 1}
}, { collection: 'Publication' })

module.exports = mongoose.model('Publication', PublicationSchema)
