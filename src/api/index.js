'use strict'

const { Router } = require('express')
const user = require('./routes/user.route')

module.exports = () => {
  const app = Router()
  // setup routes
  user(app)

  return app
}
