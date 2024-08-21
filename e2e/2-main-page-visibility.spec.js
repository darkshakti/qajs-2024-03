import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('Test-2: Main page visibility after login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // На главной странице отображаются элементы
  // Панель навигации
  await expect(page.getByLabel('Sidepanel')).toBeVisible();

  // Заголовок "Dashboard"
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Меню "Admin" в навигации
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  // Меню "PIM" в навигации
  await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();

  // Меню "Leave" в навигации
  await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible();

  // Меню "Time" в навигации
  await expect(page.getByRole('link', { name: 'Time' })).toBeVisible();

  // Кнопка "Add Employee" в разделе PIM
  await page.getByRole('link', { name: 'PIM' }).click()
  await expect(page.getByRole('link', { name: 'Add Employee' })).toBeVisible();

  // Виджет "Employee Distribution by Sub Unit"
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(
    page.locator('[class*="dashboard-widget-name"]', {hasText: 'Employee Distribution by Sub Unit'})
  ).toBeVisible();

  // Виджет "Pending Leave Requests"
  await expect(
    page.locator('[class*="dashboard-widget-name"]', {hasText: 'Time at Work'})
  ).toBeVisible();
})
