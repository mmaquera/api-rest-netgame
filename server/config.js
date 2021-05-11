'use strict'

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb+srv://demo:demo@cluster0.aw98t.mongodb.net/netgame?retryWrites=true&w=majority',
  SECRET_TOKEN: 'mySecretToken'
}
