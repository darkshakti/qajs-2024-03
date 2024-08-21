// @ts-check
import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
test('Создание нового юзера', async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/register')
  await page.getByTestId('input-username').click()
  await page.getByTestId('input-username').fill(faker.person.fullName())
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill(faker.internet.email())
  await page.getByTestId('input-email').press('Tab')
  await page.getByTestId('input-password').fill('re@l_passw0rd')
  await page.getByTestId('btn-submit').click()
  await expect(page.getByText('No articles are here... yet.')).toBeVisible()
})
test('Успешная авторизация', async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/login')

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('test@mail.ru')
  await page.getByTestId('input-email').fill('root@mail.net')

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('123123123123')
  await page.getByTestId('input-password').fill('E5dPkCf7bPTnfn6q')
  await page.getByTestId('btn-submit').click()
  await page.getByText('A place to share your').click()
  await expect(page.getByText('A place to share your')).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Damir Rysaev Damir Rysaev' }),
  ).toBeVisible()
})

test('Неуспешная регистрация c уже существующим email', async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/register')

  await page.getByTestId('input-username').click()
  await page.getByTestId('input-username').fill(faker.person.fullName())

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('root@mail.net')

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('some_password')

  await page.getByTestId('btn-submit').click()

  await expect(page.getByText('Register fail')).toBeVisible()
})

test('Неуспешная авторизация c неверным паролем', async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/login')

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('root@mail.net')

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('wrong_password')

  await page.getByTestId('btn-submit').click()

  // тут ошибка в приложении на самом деле
  await expect(page.getByText('This page could not be found.')).toBeVisible()
})

test('Неуспешная регистрация c пустыми полями', async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/register')

  await page.getByTestId('btn-submit').click()

  await expect(page.getByText('Invalid email')).toBeVisible()
  await expect(page.getByText('Password is too short')).toBeVisible()
})

test('Неуспешная авторизация c незарегистрированным email', async ({
  page,
}) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/login')

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill(faker.internet.email())

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('some_password')

  await page.getByTestId('btn-submit').click()

  // тут ошибка в приложении на самом деле
  await expect(page.getByText('This page could not be found.')).toBeVisible()
})
