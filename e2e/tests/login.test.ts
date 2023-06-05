import { expect, test } from '@playwright/test'
import { generateTestEmail, login } from '../fixtures/login'

test.describe('login', () => {
  test('should login, redirect to templates page and logout', async ({ page }) => {
    const testEmail = generateTestEmail()
    await login(page, testEmail)
    await expect(page).toHaveURL(/admin\/templates/)
    await page.locator('button[name=menu-button]').click()
    await page.getByText('Logout').click()
    await expect(page).toHaveURL(/admin\/login/)
  })
})
