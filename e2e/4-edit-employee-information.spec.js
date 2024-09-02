import { test, expect } from '@playwright/test'
import { LoginPage, MainPage, PimPage } from '../autotests-core/pages'
import generateRandomNumber from '../autotests-core/utils/number'

test.setTimeout(130000)

test('Test-4: Edit employee information', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)
  const pimPage = new PimPage(page)

  await loginPage.login('Admin', 'admin123')
  await mainPage.gotoPIM()
  await pimPage.clickAddEmployeeButton()
  await pimPage.fillFirstName('Yan')
  await pimPage.fillLastname('Curtis')
  await pimPage.fillID(`${generateRandomNumber()}`)
  await pimPage.save()

  // Перейти в раздел PIM и найти сотрудника
  await mainPage.gotoPIM()
  await pimPage.searchEmployee('Yan Curtis')
  await page.click('text=Curtis')
  // await page.waitForLoadState('domcontentloaded')

  // Изменить информацию о национальности
  await pimPage.changeNationality('Afghan')

  // Информация о сотруднике обновлена
  await expect(
    page.locator('[class*="text-input"]', { hasText: 'Afghan' }),
  ).toBeVisible({ timeout: 10000 })
})
