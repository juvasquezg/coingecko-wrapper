'use strict'

// Array with models that we don't need to associate in this service
const skipAssociation = []

module.exports = (sequelize) => {
  const fs = require('fs')
  const path = require('path')
  const Sequelize = require('sequelize')
  const basename = path.basename(__filename)
  const db = {}

  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
      db[model.name] = model
    })

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate && !skipAssociation.includes(modelName)) {
      db[modelName].associate(db)
    }
  })
  db.sequelize = sequelize
  db.Sequelize = Sequelize

  return db
}
