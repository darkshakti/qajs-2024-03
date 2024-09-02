import { expect } from '@playwright/test'

export function ArticlePage({ page }) {
  const visit = async () => {
    await page.goto('/article/post-for-test-edit')
    await expect(page.locator('h1')).toHaveText('Sign up')
  }

  return {
    visit,
  }
}
