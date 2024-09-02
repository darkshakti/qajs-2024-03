import { LoginPage } from '../pages/LoginPage'
import { expect } from '@playwright/test'

export async function login({ email, password, page }) {
  const loginPage = LoginPage({ page })

  await loginPage.login({
    email,
    password,
  })

  await expect(page.getByText('A place to share your')).toBeVisible()
}

export async function loginAdmin({ page }) {
  return login({
    email: 'root@mail.net',
    password: 'E5dPkCf7bPTnfn6q',
    page,
  })
}
