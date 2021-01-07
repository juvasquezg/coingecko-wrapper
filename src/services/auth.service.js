'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Model } = require('sequelize')
const { jwtSecret } = require('../config/auth')
const setupUserService = require('../services/user.service')

module.exports = function setupAuthService (UserModel) {
  // Parameter validation
  if (!UserModel) throw new Error('setupAuthService should have at least one argument required')
  if (!(UserModel.prototype instanceof Model)) throw new Error('first argument must be a sequelize model')

  function generateToken (user) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      jwtSecret,
      { expiresIn: '1h' }
    )
  }

  /**
   * Sign In a user
   *
   * @param  {string} username A specific username
   * @returns {string} User password
   */
  async function signIn (username, password) {
    try {
      if (!username) throw new Error('username required')
      if (!password) throw new Error('password required')

      const userService = setupUserService(UserModel)
      const userRecord = await userService.findByUsername(username)
      if (!userRecord) {
        throw new Error('User not registered')
      }
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, userRecord.password)
      if (validPassword) {
        const token = generateToken(userRecord)
        return { token }
      } else {
        throw new Error('Invalid Password')
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return {
    signIn
  }
}
