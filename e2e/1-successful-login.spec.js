import { test, expect } from '@playwright/test';

test.setTimeout(30000);

test('Test-1: Successful login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Пользователь успешно входит в систему и попадает на главную страницу
  await expect(page).toHaveURL(
    'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  );
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
})
