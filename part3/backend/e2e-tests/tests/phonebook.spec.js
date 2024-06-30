const { chromium } = require('@playwright/test');

test('front page can be opened', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');

  const locator = await page.getByText('Phonebook');
  await expect(locator).toBeVisible();
  await expect(page.getByText('Numbers')).toBeVisible();

  await browser.close();
});
