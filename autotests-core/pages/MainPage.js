const { expect } = require('@playwright/test')

export class MainPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.title = page.locator('[class*="header-breadcrumb-module"]')
  }

  async gotoPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click()
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.title).toHaveText('PIM')
  }

  async gotoDashbord() {
    await this.page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(this.title).toHaveText('Dashboard')
  }
}
