'use strict'

const express = require('express')
const loaders = require('./loaders')
const port = require('./config/port').port || 3000

const app = express()

async function startServer () {
  await loaders({ expressApp: app })
  app
    .listen(port, () => {
      console.log('\x1b[32m%s\x1b[0m', `Server listening on port: ${port} `)
    })
    .on('error', (err) => {
      console.error(err.message)
      process.exit(1)
    })
}

if (!module.parent) {
  startServer()
    .then((res) => console.log('Server started'))
    .catch((err) => {
      throw new Error(err.message)
    })
}

module.exports = {
  app,
  port
}
