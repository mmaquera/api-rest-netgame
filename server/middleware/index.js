'use strict'

const services = require('../services')

function middlewareCors (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token')
  next()
}

function middlewareAuthorized (req, res, next) {
  const key = services.decodeToken(req.headers.token)

  const idUser = key.split('|')[0]
  const userName = key.split('|')[1]

  req.sessionInformation = {
    idUser: idUser,
    userName: userName
  }

  next()
}

module.exports = {
  middlewareCors: middlewareCors,
  middlewareAuthorized: middlewareAuthorized
}
