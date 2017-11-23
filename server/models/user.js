'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  userName: String,
  password: String,
  userType: Number,
  state: { type: Number, default: 1 }
}, { collection: 'User' })

module.exports = mongoose.model('User', UserSchema)