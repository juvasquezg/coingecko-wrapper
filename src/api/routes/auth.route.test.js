'use strict'

const request = require('supertest')
const expressLoader = require('../../loaders/express')
const { app, port } = require('../../app')
const { user } = require('../../models/__test__/fixtures/user')

expressLoader({ app })

// a helper function to make a POST request
function post (url, body) {
  const httpRequest = request(app).post(url)
  httpRequest.send(body)
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', `http://localhost:${port}`)
  return httpRequest
}

// Mocking sequelizeLoader
jest.mock('../../loaders/sequelize', () => {
  const db = {
    models: {
      User: require('../../models/__test__/models/user')
    }
  }

  const sequelizeLoader = () => db
  return sequelizeLoader
})

/**
 * /api/users endpoint
 */
describe('Users endpoint - /api/users', () => {
  test('POST /api/auth/signin, Signin user', async (done) => {
    const res = await post('/api/auth/signin', {
      username: user.username,
      password: 'test.123456'
    })
    expect(res.statusCode).toEqual(200)
    console.log(res.body)
    expect(res.body).toHaveProperty('ok')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('token')
    done()
  })
})
