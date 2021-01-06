'use strict'

const Sequelize = require('sequelize')
const tableName = 'users'

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING(64),
    unique: true
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(60)
  },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING(64),
    field: 'first_name'
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING(64),
    field: 'last_name'
  },
  fullName: {
    allowNull: true,
    type: Sequelize.STRING(128),
    field: 'full_name'
  },
  preferredCurrency: {
    allowNull: false,
    type: Sequelize.ENUM,
    values: ['eur', 'ars', 'usd'],
    field: 'preferred_currency'
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'updated_at'
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}

const options = {
  // Add the timestamp attributes (updatedAt, createdAt)
  // know when the database entry went into the db and when it was updated last.
  timestamps: true,
  // Use snake case for the attributes
  underscored: true,
  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(tableName, attributes, options)
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(tableName)
  }
}
