'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = Schema({
  name: String,
  description: String,
  image: String,
  state: {type: Number, default: 1}
}, { collection: 'Game' })

module.exports = mongoose.model('Game', GameSchema)
