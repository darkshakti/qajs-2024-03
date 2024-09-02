const { expect } = require('@playwright/test')

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.loginTitle = page.locator('[class*="login-title"]')
    this.usernameInput = page.locator('input[name="username"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')
  }

  async visit() {
    await this.page.goto('/web/index.php/auth/login')
    await expect(this.loginTitle).toHaveText('Login')
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username)
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password)
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async login(username, password) {
    await this.visit()
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.submitForm()
  }
}
