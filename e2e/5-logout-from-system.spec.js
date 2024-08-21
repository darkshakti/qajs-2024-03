import { test, expect } from '@playwright/test'

test.setTimeout(40000)

test('Test-5: Logout from the system', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/')
  await page.fill('input[name="username"]', 'Admin')
  await page.fill('input[name="password"]', 'admin123')
  await page.click('button[type="submit"]')

  // Выход из системы
  await page
    .getByRole('banner')
    .getByRole('img', { name: 'profile picture' })
    .click()
  await page.getByRole('menuitem', { name: 'Logout' }).click()

  // Пользователь перенаправлен на страницу входа
  await expect(page).toHaveURL(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  )
  await expect(page.locator('input[name="username"]')).toBeVisible()
})
