'use strict'

const express = require('express')
const cors = require('cors')
const routes = require('../api')

module.exports = ({ app }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (_req, res) => {
    res.status(200).end()
  })
  app.head('/status', (_req, res) => {
    res.status(200).end()
  })

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy')

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors())

  // Transforms the raw string of req.body into json
  app.use(express.json())
  // Load API routes
  app.use('/api', routes())

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({
          ok: false,
          error: err.message
        })
        .end()
    }
    return next(err)
  })
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      ok: false,
      error: err.message
    })
  })

  // unhandleRejection and uncaughtException
  function handleFatalError (err) {
    console.error(err.stack)
    process.exit(1) // service restarts in production
  }

  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)
}
