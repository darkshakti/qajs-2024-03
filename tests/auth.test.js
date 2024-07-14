import { config as _config } from '../framework'
import supertest from 'supertest'

const config = _config.dummyjson

describe('Auth', () => {
  it('Success login', async () => {
    const response = await supertest(config.baseURL).post('/auth/login').send({
      username: config.username,
      password: config.password,
      expiresInMins: 30,
    })

    expect(response.status).toEqual(200)
    expect(response.body.username).toBe(config.username)
    expect(response.body.token).toBeTruthy()
  })

  it('Failed login', async () => {
    let response
    try {
      response = await supertest(config.baseURL).post('/auth/login').send({
        username: config.username,
        password: 'wrongpassword',
      })
    } catch (error) {
      response = error.response
    }

    expect(response?.status).toEqual(400)
    expect(response?.body.message).toBe('Invalid credentials')
  })
})
