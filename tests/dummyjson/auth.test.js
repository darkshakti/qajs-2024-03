/* eslint-disable jest/no-conditional-expect */
import { config as _config, AuthDummyjsonService } from '../../framework'

const config = _config.dummyjson

describe('Auth', () => {
  it('Success login', async () => {
    const response = await AuthDummyjsonService.login({
      username: config.username,
      password: config.password,
    })

    expect(response.status).toEqual(200)
    expect(response.data.username).toBe(config.username)
    expect(response.data.token).toBeTruthy()
  })

  it('Failed login', async () => {
    try {
      await AuthDummyjsonService.login({
        username: config.username,
        password: 'wrongpassword',
      })
    } catch (error) {
      expect(error.response.statusCode).toEqual(400)
      expect(error.response.body.message).toBe('Invalid credentials')
    }
  })
})
