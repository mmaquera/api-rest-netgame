'use strict'

const user = require('./user')
const authorize = require('./authorize')
const game = require('./game')
const publication = require('./publication')
const comment = require('./comment')
const event = require('./event')

module.exports = {
  user: user,
  authorize: authorize,
  game: game,
  publication: publication,
  comment: comment,
  event: event
}