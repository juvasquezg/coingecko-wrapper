'use strict'

const { Router } = require('express')
const sequelizeLoader = require('../../loaders/sequelize')
const setupAuthService = require('../../services/auth.service')

const route = Router()
const db = sequelizeLoader()

module.exports = function (app) {
  const { User } = db.models

  app.use('/auth', route)
  // Signin a user
  route.post('/signin', async (req, res, next) => {
    try {
      const authService = setupAuthService(User)
      const userReq = { ...req.body }
      const { token } = await authService.signIn(userReq.username, userReq.password)
      res.status(200).json({
        ok: true,
        data: { token }
      })
    } catch (err) {
      return next(err)
    }
  })
}
