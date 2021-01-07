'use strict'

const { Router } = require('express')
const user = require('./routes/user.route')
const auth = require('./routes/auth.route')

module.exports = () => {
  const app = Router()
  // setup routes
  user(app)
  auth(app)

  return app
}
