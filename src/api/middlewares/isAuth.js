'use strict'

const jwt = require('express-jwt')
const { jwtSecret, jwtAlgorithm } = require('../../config/auth')

/**
 * JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT} || bearer ${JWT}
 */
const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const isAuth = jwt({
  secret: jwtSecret, // The _secret_ to sign the JWTs
  algorithms: [jwtAlgorithm], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader // How to extract the JWT from the request
})

module.exports = {
  getTokenFromHeader,
  isAuth
}
