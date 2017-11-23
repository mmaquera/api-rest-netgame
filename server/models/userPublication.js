'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserPublicationSchema = Schema({
  like: Number,
  favorite: Number,
  state: { type: Number, default: 1 },
  idUser: String,
  idPublication: String
}, { collection: 'User_Publication' })

module.exports = mongoose.model('User_Publication', UserPublicationSchema)
