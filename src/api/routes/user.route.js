'use strict'

const { Router } = require('express')
const sequelizeLoader = require('../../loaders/sequelize')
const setupUserService = require('../../services/user.service')

const route = Router()
const db = sequelizeLoader()

module.exports = function (app) {
  const { User } = db.models

  app.use('/users', route)
  // Create user
  route.post('/', async (req, res, next) => {
    try {
      const userService = setupUserService(User)
      const userReq = { ...req.body }
      const user = await userService.createOrUpdate(userReq)
      res.status(201).json({
        ok: true,
        data: { ...user }
      })
    } catch (err) {
      return next(err)
    }
  })
}
