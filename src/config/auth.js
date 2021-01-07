'use strict'

const prefix = require('./environment')

module.exports = {
  jwtSecret: process.env[`${prefix}JWT_SECRET`],
  jwtAlgorithm: process.env[`${prefix}JWT_ALGORITHM`]
}
