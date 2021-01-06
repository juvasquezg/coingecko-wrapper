'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')
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
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10)
      // set user password to hashed password
      userReq.password = await bcrypt.hash(userReq.password, salt)
      const user = await userService.createOrUpdate(userReq)
      // response must not have password property
      delete user.password
      res.status(201).json({
        ok: true,
        data: { ...user }
      })
    } catch (err) {
      return next(err)
    }
  })
}
