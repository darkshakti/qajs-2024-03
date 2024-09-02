// @ts-check
import { expect } from '@playwright/test'

export function AuthPage({ page }) {
  const visit = async () => {
    await page.goto('/register')
    await expect(page.locator('h1')).toHaveText('Sign up')
  }

  const fillUsername = async username => {
    await page.getByTestId('input-username').fill(username)
  }

  // const getUsernameError = async () => {
  //   return await page.locator()
  // }

  const fillEmail = async email => {
    await page.getByTestId('input-email').fill(email)
  }

  const fillPassword = async password => {
    await page.getByTestId('input-password').fill(password)
  }

  const submitForm = async () => {
    await page.getByTestId('btn-submit').click()
  }

  const reg = async ({ username, email, password }) => {
    await visit()
    await fillUsername(username)
    await fillEmail(email)
    await fillPassword(password)
    await submitForm()
  }

  return {
    visit,
    fillUsername,
    fillPassword,
    fillEmail,
    submitForm,
    reg,
  }
}
