'use strict'

const setupAuthService = require('./auth.service')
const { Model } = require('sequelize')

describe('setupAuthService - user service', () => {
  test('setupAuthService should have at least one argument required', () => {
    expect(() => setupAuthService()).toThrowError('setupAuthService should have at least one argument required')
  })

  test('setupAuthService should throw an error if its argument does not extend from sequelize Model', () => {
    class User {}
    expect(() => setupAuthService(User)).toThrowError('first argument must be a sequelize model')
  })

  test('argument of setupAuthService should be a class that extends of sequelize Model', () => {
    class User extends Model {}
    const userService = setupAuthService(User)
    expect(typeof userService).toBe('object')
  })

  /**
   * Functions that setupAuthService returns
   */

  // Create or udpdate a user
  test('setupAuthService returns an object with signIn function', () => {
    class User extends Model {}
    const { signIn } = setupAuthService(User)
    expect(typeof signIn).toBe('function')
  })

  test('signIn function must receive username', async () => {
    class User extends Model {}
    const { signIn } = setupAuthService(User)
    try {
      await signIn()
    } catch (err) {
      expect(err).toEqual(new Error('username required'))
    }
  })

  test('signIn function must receive password', async () => {
    class User extends Model {}
    const { signIn } = setupAuthService(User)
    try {
      await signIn('username')
    } catch (err) {
      expect(err).toEqual(new Error('password required'))
    }
  })
})
