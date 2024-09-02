import { test, expect } from '@playwright/test'
import { LoginPage } from '../autotests-core/pages'

test.setTimeout(60000)

test('Test-5: Logout from the system', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.login('Admin', 'admin123')

  // Выход из системы
  await page
    .getByRole('banner')
    .getByRole('img', { name: 'profile picture' })
    .click()
  await page.getByRole('menuitem', { name: 'Logout' }).click()

  // Пользователь перенаправлен на страницу входа
  await expect(page).toHaveURL('/web/index.php/auth/login')
  await expect(loginPage.usernameInput).toBeVisible()
})
