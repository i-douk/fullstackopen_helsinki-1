const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:3001')

  const locator = await page.getByText('Phonebook')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Numbers')).toBeVisible()
})