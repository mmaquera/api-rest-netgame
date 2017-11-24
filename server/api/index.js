'use strict'

const user = require('./user')
const authorize = require('./authorize')
const game = require('./game')
const publication = require('./publication')
const comment = require('./comment')
const event = require('./event')
const cabin = require('./cabin')
const userCabin = require('./userCabin')
const userGamer = require('./userGamer')

module.exports = {
  user: user,
  authorize: authorize,
  game: game,
  publication: publication,
  comment: comment,
  event: event,
  cabin: cabin,
  userCabin: userCabin,
  userGamer: userGamer
}