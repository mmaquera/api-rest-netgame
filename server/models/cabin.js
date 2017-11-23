'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CabinSchema = Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
  stateAttention: { type: Number, default: 1 },
  state: { type: Number, default: 1 },
  idUser: String
}, { collection: 'Cabin' })

module.exports = mongoose.model('Cabin', CabinSchema)
