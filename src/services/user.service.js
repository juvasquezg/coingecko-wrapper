'use strict'

const bcrypt = require('bcrypt')
const { Model } = require('sequelize')

module.exports = function setupUserService (UserModel) {
  // Parameter validation
  if (!UserModel) throw new Error('setupUserService should have at least one argument required')
  if (!(UserModel.prototype instanceof Model)) throw new Error('first argument must be a sequelize model')

  /**
   * Create or update a user
   *
   * @param  {Object} user The user to create or update
   * @returns {Object} User that was created or updated
   */
  async function createOrUpdate (user) {
    try {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10)
      // set user password to hashed password
      user.password = await bcrypt.hash(user.password, salt)
      const result = await UserModel.create(user)
      const userRecord = result.toJSON()
      // response must not have password property
      delete userRecord.password
      return userRecord
    } catch (err) {
      throw new Error(err.message)
    }
  }

  /**
   * Find a specific user by username
   *
   * @param  {string} username a specific username
   * @returns {(Object|null)} User if it is found, if not it returns null
   */
  async function findByUsername (username) {
    if (username) {
      const cond = {
        where: {
          username
        }
      }

      let userFound = null

      try {
        userFound = await UserModel.findOne(cond)
      } catch (err) {
        throw new Error(err.message)
      }

      if (userFound) {
        return userFound.toJSON()
      } else {
        return userFound
      }
    } else {
      throw new Error('The username argument is required')
    }
  }

  return {
    createOrUpdate,
    findByUsername
  }
}
