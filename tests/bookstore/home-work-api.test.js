/* eslint-disable jest/no-disabled-tests */
import config from '../../framework/config/configBookstore'
import { AuthService, UserService } from '../../framework'

describe.skip('Account Tests', () => {
  let token
  const userId = config.userId

  it('Успешная авторизация', async () => {
    const response = await AuthService.generateToken({
      userName: config.userName,
      password: config.password,
    })

    token = response.data.token

    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  }, 30000)

  it('Получение информации о пользователе', async () => {
    const response = await UserService.get({
      userId,
      token,
    })

    expect(response.status).toBe(200)
    expect(response.data.username).toBe(config.userName)
  })

  it('Удаление юзера', async () => {
    const response = await UserService.remove({
      userId,
      token,
    })

    expect(response.status).toBe(204)
    expect(response.data).toBe('')
  })
})
