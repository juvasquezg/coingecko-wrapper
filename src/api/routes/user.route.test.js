'use strict'

const request = require('supertest')
const expressLoader = require('../../loaders/express')
const { app, port } = require('../../app')
const { user } = require('../../models/__test__/fixtures/user')

expressLoader({ app })

// a helper function to make a POST request
function post (url, body, token = null) {
  const httpRequest = request(app).post(url)
  // if (token) {
  //   httpRequest.set('Authorization', token)
  // }
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
  test('POST /users/login, user was created or updated', async (done) => {
    const res = await post('/api/users', { ...user, password: 'test.123456' })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('ok')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('username')
    // important: response must not have password property
    expect(res.body.data).not.toHaveProperty('password')
    expect(res.body.data).toHaveProperty('firstName')
    expect(res.body.data).toHaveProperty('lastName')
    expect(res.body.data).toHaveProperty('fullName')
    expect(res.body.data).toHaveProperty('preferredCurrency')
    expect(res.body.ok).toBe(true)
    done()
  })
})
