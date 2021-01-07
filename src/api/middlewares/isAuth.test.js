'use strict'

const express = require('express')
const request = require('supertest')
const { getTokenFromHeader } = require('./isAuth')

const app = express()

app.get('/getTokenFromHeader', (req, res) => {
  const token = getTokenFromHeader(req)
  res.json({ token })
})

describe('test auth middleware', () => {
  test('when token is not correct', async (done) => {
    const res = await request(app).get('/getTokenFromHeader')
    expect(res.body).toHaveProperty('token')
    expect(res.body.token).toBe(null)
    done()
  })

  test('when token is correct', async (done) => {
    const token = 'bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI'
    const res = await request(app).get('/getTokenFromHeader').set('Authorization', token)
    expect(res.body).toHaveProperty('token')
    expect(res.body.token).toBe(token.split(' ')[1])
    done()
  })
})
