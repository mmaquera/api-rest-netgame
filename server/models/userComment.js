'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserCommentSchema = Schema({
  like: Number,
  state: { type: Number, default: 1 },
  idComment: String,
  idUser: String
}, { collection: 'User_Comment' })

module.exports = mongoose.model('User_Comment', UserCommentSchema)
