/* eslint-disable jest/no-disabled-tests */
import config from '../../framework/config/configBookstore'
import { AuthService } from '../../framework'

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const response = await AuthService.generateTokenCached({
      userName: config.userName,
      password: config.password,
    })

    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  }, 60000)

  it('Нельзя авторизоваться без пароля', async () => {
    const response = await AuthService.generateToken({
      userName: config.userName,
      password: '',
    })

    expect(response.status).toBe(400)
    expect(response.data.code).toBe('1200')
    expect(response.data.message).toBe('UserName and Password required.')
  })
})
