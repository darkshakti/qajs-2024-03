// @ts-check
import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { AuthPage } from '../../framework/pages/AuthPage'
import { LoginPage } from '../../framework/pages/LoginPage'

test.skip('Создание нового юзера', async ({ page }) => {
  const authPage = AuthPage({ page })

  await authPage.reg({
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'E5dPkCf7bPTnfn6q',
  })

  await expect(page.getByText('No articles are here... yet.')).toBeVisible()
})

test.skip('Успешная авторизация', async ({ page }) => {
  const loginPage = LoginPage({ page })

  await loginPage.login({
    email: 'root@mail.net',
    password: 'E5dPkCf7bPTnfn6q',
  })
  await page.getByText('A place to share your').click()

  await expect(page.getByText('A place to share your')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Damir Rysaev Damir Rysaev' }),
  ).toBeVisible()
})

test.skip('Неуспешная регистрация c уже существующим email', async ({
  page,
}) => {
  const authPage = AuthPage({ page })

  await authPage.visit()
  await page.getByTestId('input-username').fill(faker.person.fullName())

  await authPage.fillUsername(faker.person.fullName())
  await authPage.fillEmail('root@mail.net')
  await authPage.fillPassword('some_password')
  await page.getByTestId('btn-submit').click()

  await expect(page.getByText('Register fail')).toBeVisible()
})

test.skip('Неуспешная авторизация c неверным паролем', async ({ page }) => {
  const loginPage = LoginPage({ page })

  await loginPage.visit()
  await page.getByTestId('btn-submit').click()

  // тут ошибка в приложении на самом деле
  await expect(page.getByText('This page could not be found.')).toBeVisible()
})

test.skip('Неуспешная регистрация c пустыми полями', async ({ page }) => {
  const authPage = AuthPage({ page })

  await authPage.visit()
  await authPage.submitForm()

  await expect(page.getByText('Invalid email')).toBeVisible()
  await expect(page.getByText('Password is too short')).toBeVisible()
})

test.skip('Неуспешная авторизация c незарегистрированным email', async ({
  page,
}) => {
  const loginPage = LoginPage({ page })

  await loginPage.visit()
  await loginPage.fillEmail('wrong-email@mail.com')
  await loginPage.fillPassword('some_password')
  await page.getByTestId('btn-submit').click()

  // тут ошибка в приложении на самом деле
  await expect(page.getByText('This page could not be found.')).toBeVisible()
})
