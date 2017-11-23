'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GamerSchema = Schema({
  name: String,
  lastName: String,
  phone: String,
  address: String,
  nickName: String,
  age: Number,
  gender: String,
  state: { type: Number, default: 1 },
  idUser: String
}, { collection: 'Gamer' })

module.exports = mongoose.model('Gamer', GamerSchema)