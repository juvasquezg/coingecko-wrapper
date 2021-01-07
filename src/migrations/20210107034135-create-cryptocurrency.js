'use strict'

const Sequelize = require('sequelize')
const tableName = 'cryptocurrencies'

const attributes = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      // Reference to users table
      model: {
        tableName: 'users'
      },
      key: 'id'
    },
    field: 'user_id'
  },
  coinId: {
    type: Sequelize.STRING(100),
    allowNull: false,
    field: 'coin_id'
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
  timestamps: true,
  underscored: true,
  paranoid: true
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(tableName, attributes, options)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName)
  }
}
