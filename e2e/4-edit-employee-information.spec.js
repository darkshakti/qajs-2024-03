import { test, expect } from '@playwright/test';

test.setTimeout(100000);

test('Test-4: Edit employee information', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('domcontentloaded');

  // Создать сотрудника
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: ' Add ' }).click();
  await page.fill('input[name="firstName"]', 'Yan');
  await page.fill('input[name="lastName"]', 'Curtis');
  await page.click('button[type="submit"]');

  // Перейти в раздел PIM и найти сотрудника
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('input[placeholder="Type for hints..."]').first().fill('Yan Curtis');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.click('text=Curtis');
  await page.waitForLoadState('domcontentloaded');

  // Изменить информацию о национальности
  await page.locator('[class*="input-field-bottom-space"]', {hasText: 'Nationality'}).locator('[class*="text-input"]').click();
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('option', { name: 'Afghan' }).click();
  await page.click('button[type="submit"]');

  // Информация о сотруднике обновлена
  await expect(page.locator('[class*="text-input"]', {hasText: 'Afghan'})).toBeVisible({timeout: 10000});
})
