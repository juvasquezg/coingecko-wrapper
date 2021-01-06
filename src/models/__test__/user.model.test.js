'use strict'

const User = require('./models/user')
const { user } = require('./fixtures/user')

describe('user model', () => {
  /**
   * User model test
   */
  test('User#create - new', async () => {
    expect(typeof User.create).toBe('function')
    const userCreated = await User.create(user)
    expect(userCreated.toJSON()).toBeTruthy()
  })
})
