import { config as _config } from '../framework'
import axios from 'axios'

const config = _config.dummyjson

describe('Auth', () => {
  it('Success login', async () => {
    const response = await axios.post(`${config.baseURL}/auth/login`, {
      username: config.username,
      password: config.password,
    })

    expect(response.status).toEqual(200)
    expect(response.data.username).toBe(config.username)
    expect(response.data.token).toBeTruthy()
  })

  it('Failed login', async () => {
    let response
    try {
      response = await axios.post(`${config.baseURL}/auth/login`, {
        username: config.username,
        password: 'wrongpassword',
      })
    } catch (error) {
      response = error.response
    }

    expect(response?.status).toEqual(400)
    expect(response?.data.message).toBe('Invalid credentials')
  })
})
