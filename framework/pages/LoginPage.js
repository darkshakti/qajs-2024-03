// @ts-check
import { expect } from '@playwright/test'

export function LoginPage({ page }) {
  const visit = async () => {
    await page.goto('/login')
    await expect(page.locator('h1')).toHaveText('Sign in')
  }

  const fillEmail = async email => {
    await page.getByTestId('input-email').fill(email)
  }

  const fillPassword = async password => {
    await page.getByTestId('input-password').fill(password)
  }

  const submitForm = async () => {
    await page.getByTestId('btn-submit').click()
  }

  const login = async ({ email, password }) => {
    await visit()
    await fillEmail(email)
    await fillPassword(password)
    await submitForm()
  }

  return {
    visit,
    fillPassword,
    fillEmail,
    submitForm,
    login,
  }
}
