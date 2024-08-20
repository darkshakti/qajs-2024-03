import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test('Test-4: Edit employee information', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Перейти в раздел PIM и найти сотрудника
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.fill('input[placeholder="Type for hints..."]', 'Jonathan Livingston');
  await page.click('text=Livingston');

  // Изменить информацию о национальности
  await page.locator('[class*="input-field-bottom-space"]', {hasText: 'Nationality'})
  .locator('[class*="text-input"]').click();
  await page.getByRole('option', { name: 'Afghan' }).click();
  await page.click('button[type="submit"]');

  // Информация о сотруднике обновлена
  await expect(page.locator('[class*="text-input"]', {hasText: 'Afghan'})).toBeVisible({timeout: 10000});
})
