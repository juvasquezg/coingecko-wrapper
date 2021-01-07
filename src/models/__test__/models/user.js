'use strict'

const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
const { user } = require('../fixtures/user')

async function generatePassword (pass) {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)
  // set user password to hashed password
  const password = await bcrypt.hash(pass, salt)
  return password
}

class User extends Model {
  static create (user) {
    return Promise.resolve({
      toJSON () {
        return { ...user, id: 1 }
      }
    })
  }

  static async findOne () {
    const password = await generatePassword('test.123456')
    return Promise.resolve({
      toJSON () {
        return {
          ...user,
          password,
          id: 1
        }
      }
    })
  }
}

module.exports = User
