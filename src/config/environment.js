'use strict'

const path = require('path')

let environment

const env = '.env'

switch (process.env.NODE_ENV) {
  case 'development':
    environment = 'DEV_'
    break
  case 'staging':
    environment = 'STAGING_'
    break
  case 'production':
    environment = ''
    break
  default: {
    const dotenv = require('dotenv')
    environment = process.env.NODE_ENV === 'test' ? 'TEST_' : 'LOCAL_'
    const pathenv = path.join(__dirname, '..', '..', `${env}`)
    dotenv.config({ path: pathenv })
    break
  }
}

module.exports = environment
