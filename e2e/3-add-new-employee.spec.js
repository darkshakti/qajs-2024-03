import { test, expect } from '@playwright/test'

test.setTimeout(60000)

test('Test-3: Add new employee', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/')
  await page.fill('input[name="username"]', 'Admin')
  await page.fill('input[name="password"]', 'admin123')
  await page.click('button[type="submit"]')

  // Перейти в раздел PIM
  await page.getByRole('link', { name: 'PIM' }).click()

  // Нажать кнопку Add Employee
  await page.getByRole('link', { name: 'Add Employee' }).click()

  await page.fill('input[name="firstName"]', 'Jonathan')
  await page.fill('input[name="lastName"]', 'Livingston')
  await page.click('button[type="submit"]')

  // Отображается карточка нового сотрудника
  await expect(
    page.getByRole('heading', { name: 'Jonathan Livingston' }),
  ).toBeVisible({ timeout: 10000 })
})
