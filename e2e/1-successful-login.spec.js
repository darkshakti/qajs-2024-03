import { test, expect } from '@playwright/test'
import { LoginPage } from '../autotests-core/pages'

test.setTimeout(60000)

test('Test-1: Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.login('Admin', 'admin123')

  // Пользователь успешно входит в систему и попадает на главную страницу
  await expect(page).toHaveURL('/web/index.php/dashboard/index')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
