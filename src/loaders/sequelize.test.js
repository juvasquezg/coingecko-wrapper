'use strict'

const sequelizeLoader = require('./sequelize')

describe('test sequelize loader', () => {
  test('sequelizeLoader is a function', () => {
    expect(typeof sequelizeLoader).toBe('function')
  })

  test('sequelizeLoader returns an instance that has the loadModels method', () => {
    const db = sequelizeLoader()
    expect(typeof db.loadModels).toBe('function')
  })

  test('sequelizeLoader returns an instance that has the connect method', () => {
    const db = sequelizeLoader()
    expect(typeof db.connect).toBe('function')
  })
})
