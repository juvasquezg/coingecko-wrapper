'use strict'

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
    const result = await UserModel.create(user)
    return result.toJSON()
  }

  return {
    createOrUpdate
  }
}
