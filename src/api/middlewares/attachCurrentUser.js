'use strict'

const sequelizeLoader = require('../../loaders/sequelize')
const setupUserService = require('../../services/user.service')

const db = sequelizeLoader()

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  try {
    const { User } = db.models
    const userService = setupUserService(User)
    const user = await userService.findByUsername(req.token.username)
    if (!user) {
      return res.sendStatus(401)
    }
    delete user.password
    req.currentUser = user
    return next()
  } catch (err) {
    return next(err)
  }
}

export default attachCurrentUser
