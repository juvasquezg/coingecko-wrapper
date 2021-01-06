'use strict'

const expressLoader = require('./express')

describe('test express loader', () => {
  test('expressLoader is a function', () => {
    expect(typeof expressLoader).toBe('function')
  })
})
