import { expect } from '@playwright/test'

export function ArticleEditPage({ page, slug }) {
  const visit = async (slug = '') => {
    await page.goto(`/editor/${slug}`)
    await expect(page.locator('h1')).toHaveText('Sign up')
  }

  const fillTitle = title => {
    // your code here...
  }

  return {
    visit,
    fillTitle,
    // fillAbout,
    // fillContent,
    // fillTags,
    // publish
  }
}
