// @ts-nocheck
import { test, expect } from '@playwright/test'
import { loginAdmin } from '../../framework/actions/auth'

test.beforeEach(async ({ page }) => {
  await loginAdmin({ page })
})

test('Обновление страницы', async ({ page }) => {
  await page.goto('/article/post-for-test-edit')
  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL('/editor/post-for-test-edit')
  await page.getByPlaceholder('Write your article (in').fill('New text')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByText('New text')).toBeVisible()

  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL('/editor/post-for-test-edit')

  await page.getByPlaceholder('Write your article (in').fill('Old text')

  await page.getByRole('button', { name: 'Publish Article' }).click()
  await page.waitForURL('/article/post-for-test-edit')

  // этого тут тоже не должно быть, но страница в кеше
  await page.reload()
  await expect(page.getByText('Old text')).toBeVisible()
})

test('Добавляем комментарий страницы, сервер не отвечает', async ({ page }) => {
  // visit

  // fill

  await page.route('/api/articles/post-for-test-edit/comments', async route => {
    await route.fulfill({
      status: 500,
      body: {},
    })
  })

  // submit

  // проверка
})
