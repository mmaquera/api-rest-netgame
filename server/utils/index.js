'use strict'

module.exports = {
  ok: (data, message) => {
    let response = {
      data: data,
      statusBody: {
        code: '0',
        message: message
      }
    }
    return response
  },
  internalServerError: (data, message) => {
    let response = {
      data: data || {},
      statusBody: {
        code: '1',
        message: message
      }
    }
    return response
  },
  authorize: (tokenAccess, typeUser, message) => {
    let obj = {
      tokenAccess: tokenAccess,
      expireIn: 3600,
      typeUser: typeUser,
      status: 'OK'
    }

    let response = {
      data: obj,
      statusBody: {
        code: '0',
        message: message
      }
    }

    return response
  }
}