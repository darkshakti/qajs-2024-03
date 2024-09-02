import { test, expect } from '@playwright/test'
import { LoginPage, MainPage, PimPage } from '../autotests-core/pages'
import generateRandomNumber from '../autotests-core/utils/number'

test.setTimeout(80000)

test('Test-3: Add new employee', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)
  const pimPage = new PimPage(page)

  await loginPage.login('Admin', 'admin123')
  await mainPage.gotoPIM()
  await pimPage.clickAddEmployeeButton()
  await pimPage.fillFirstName('Jonathan')
  await pimPage.fillLastname('Livingston')
  await pimPage.fillID(`${generateRandomNumber()}`)
  await pimPage.save()

  // Отображается карточка нового сотрудника
  await expect(
    page.getByRole('heading', { name: 'Jonathan Livingston' }),
  ).toBeVisible({ timeout: 10000 })
})
