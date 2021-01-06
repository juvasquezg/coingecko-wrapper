'use strict'

const expressLoader = require('./express')
const sequelizeLoader = require('./sequelize')

module.exports = async ({ expressApp }) => {
  try {
    const db = sequelizeLoader()
    db.loadModels()
    await db.connect()
    console.log('DB loaded and connected!')
    expressLoader({ app: expressApp })
    console.log('Express loaded!')
  } catch (err) {
    throw new Error(err.message)
  }
}
