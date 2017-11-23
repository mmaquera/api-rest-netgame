'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = Schema({
  description: String,
  date: String,
  state: { type: Number, default: 1 },
  idUser: String,
  idPublication: String
}, { collection: 'Comment' })

module.exports = mongoose.model('Comment', CommentSchema)
