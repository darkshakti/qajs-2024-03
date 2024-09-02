import { test, expect } from '@playwright/test'
import { LoginPage, MainPage } from '../autotests-core/pages'

test.setTimeout(60000)

test('Test-2: Main page visibility after login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await loginPage.login('Admin', 'admin123')

  // На главной странице отображаются элементы
  // Панель навигации
  await expect(page.getByLabel('Sidepanel')).toBeVisible()

  // Заголовок "Dashboard"
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  // Меню "Admin" в навигации
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

  // Меню "PIM" в навигации
  await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible()

  // Меню "Leave" в навигации
  await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible()

  // Меню "Time" в навигации
  await expect(page.getByRole('link', { name: 'Time' })).toBeVisible()

  await mainPage.gotoPIM()

  // Кнопка "Add Employee" в разделе PIM
  await expect(page.getByRole('link', { name: 'Add Employee' })).toBeVisible()

  await mainPage.gotoDashbord()

  // Виджет "Employee Distribution by Sub Unit"
  await expect(
    page.locator('[class*="dashboard-widget-name"]', {
      hasText: 'Employee Distribution by Sub Unit',
    }),
  ).toBeVisible()

  // Виджет "Pending Leave Requests"
  await expect(
    page.locator('[class*="dashboard-widget-name"]', {
      hasText: 'Time at Work',
    }),
  ).toBeVisible()
})
