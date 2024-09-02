const { expect } = require('@playwright/test')

export class PimPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.mainTitle = page.locator('[class*="main-title"]')
    this.firstNameInput = page.locator('input[name="firstName"]')
    this.lastNameInput = page.locator('input[name="lastName"]')
    this.employeeIdInput = page
      .locator('div')
      .filter({ hasText: /^Employee Id$/ })
      .nth(2)
    this.submitButton = page.locator('button[type="submit"]').first()
    this.nameSearchInput = page
      .locator('input[placeholder="Type for hints..."]')
      .first()
    this.searchButton = page.getByRole('button', { name: 'Search' })
    this.nationalityChoice = page
      .locator('[class*="input-field-bottom-space"]', {
        hasText: 'Nationality',
      })
      .locator('[class*="text-input"]')
  }

  async clickAddEmployeeButton() {
    await this.page.getByRole('link', { name: 'Add Employee' }).click()
    await expect(this.mainTitle).toHaveText('Add Employee')
  }

  async fillFirstName(firstname) {
    await this.firstNameInput.fill(firstname)
  }

  async fillLastname(lastname) {
    await this.lastNameInput.fill(lastname)
  }

  async fillID(employeeId) {
    await this.employeeIdInput.click()
    await this.employeeIdInput.pressSequentially(employeeId)
  }

  async save() {
    await this.submitButton.click()
  }

  async searchEmployee(employeeName) {
    await this.nameSearchInput.fill(employeeName)
    await this.searchButton.click()
  }

  async changeNationality(nationality) {
    await this.nationalityChoice.click()
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.getByRole('option', { name: nationality }).click()
    await this.save()
  }
}
