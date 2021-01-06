'use strict'

const { Sequelize } = require('sequelize')
const config = require('../config/database')
const models = require('../models')

/** Class representing a database. */
class Db {
  /**
   * Create a Sequelize instance
   */
  constructor () {
    this.sequelize = new Sequelize(config)
  }

  /**
   * Load sequelize models
   */
  loadModels () {
    if (this.sequelize) this.models = models(this.sequelize)
  }

  /**
   * Connecting to a database
   */
  async connect () {
    try {
      await this.sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
      Promise.reject(err.message)
    }
  }
}

let db = null

// singleton
function sequelizeLoader () {
  if (!db) db = new Db()

  return db
}

module.exports = sequelizeLoader
