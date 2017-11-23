'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user){

  const text = `${user._id}|${user.userName}`
  const payload = {
    sub: text,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)

}

function decodeToken (token){

  const payload = jwt.decode(token, config.SECRET_TOKEN)
  let resp = payload.sub

  if (payload.exp <= moment().unix()){
    resp = ''
  }

  return resp
  
}

module.exports = {createToken, decodeToken}