'use strict'

const prefix = require('./environment')

module.exports = {
  database: process.env[`${prefix}PG_DATABASE`],
  username: process.env[`${prefix}PG_USERNAME`],
  password: process.env[`${prefix}PG_PASSWORD`],
  // disable logging; default: console.log
  logging: false,
  host: process.env[`${prefix}PG_HOST`],
  port: process.env[`${prefix}PG_PORT`],
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  },
  migrationStorageTableName: 'sequelize_meta_migrations',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_meta_seeders'
}
