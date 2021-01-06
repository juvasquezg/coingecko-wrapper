'use strict'

const setupUserService = require('./user.service')
const { Model } = require('sequelize')

describe('setupUserService - user service', () => {
  test('setupUserService should have at least one argument required', () => {
    expect(() => setupUserService()).toThrowError('setupUserService should have at least one argument required')
  })

  test('setupUserService should throw an error if its argument does not extend from sequelize Model', () => {
    class User {}
    expect(() => setupUserService(User)).toThrowError('first argument must be a sequelize model')
  })

  test('argument of setupUserService should be a class that extends of sequelize Model', () => {
    class User extends Model {}
    const userService = setupUserService(User)
    expect(typeof userService).toBe('object')
  })

  /**
   * Functions that setupUserService returns
   */

  // Create or udpdate a user
  test('setupUserService returns an object with createOrUpdate function', () => {
    class User extends Model {}
    const { createOrUpdate } = setupUserService(User)
    expect(typeof createOrUpdate).toBe('function')
  })
})
