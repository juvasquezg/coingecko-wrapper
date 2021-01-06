'use strict'

const prefix = require('./environment')

module.exports = {
  port: process.env[`${prefix}PORT`]
}
