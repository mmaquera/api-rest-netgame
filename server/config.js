'use strict'

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/netgame',
  SECRET_TOKEN: 'mySecretToken'
}
