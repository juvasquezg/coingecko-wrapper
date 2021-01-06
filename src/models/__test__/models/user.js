'use strict'

const { Model } = require('sequelize')

class User extends Model {
  static create (user) {
    return Promise.resolve({
      toJSON () {
        return { ...user, id: 1 }
      }
    })
  }
}

module.exports = User
