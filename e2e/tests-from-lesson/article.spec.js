// @ts-check
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://rwa-194.87.102.103.sslip.io/login')

  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('root@mail.net')

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('E5dPkCf7bPTnfn6q')
  await page.getByTestId('btn-submit').click()
  await page.getByText('A place to share your').click()
  await expect(page.getByText('A place to share your')).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  await page.goto(
    'https://rwa-194.87.102.103.sslip.io/article/post-for-test-edit',
  )
  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL(
    'https://rwa-194.87.102.103.sslip.io/editor/post-for-test-edit',
  )
  await page.getByPlaceholder('Write your article (in').fill('New text')
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await expect(page.getByText('New text')).toBeVisible()

  await page.getByRole('button', { name: 'Edit Article' }).first().click()
  await page.waitForURL(
    'https://rwa-194.87.102.103.sslip.io/editor/post-for-test-edit',
  )
  await page.getByPlaceholder('Write your article (in').fill('Old text')
  await page.pause()
  await page.getByRole('button', { name: 'Publish Article' }).click()
  await page.waitForURL(
    'https://rwa-194.87.102.103.sslip.io/article/post-for-test-edit',
  )
  // этого тут тоже не должно быть, но страница в кеше
  await page.reload()
  await expect(page.getByText('Old text')).toBeVisible()
})
