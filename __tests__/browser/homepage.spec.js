import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./home-page.html', { waitUntil: 'networkidle' });
});

test('Homepage loads and shows title', async ({ page }) => {
    console.log('Current URL:', await page.url());
    await expect(page).toHaveTitle('Home | Club Triton');
});

test('navbar loads expected content', async ({ page }) => {
    const navbarItem = page.locator('#navbar-container nav')

    await expect(navbarItem).toBeVisible({ timeout: 5000 });
});

test('displays game title', async ({ page }) => {
    const gameTitle = page.locator('.game-title.appear');

    await expect(gameTitle).toBeVisible();
    await expect(gameTitle).toHaveText('The Club Triton');
});

test('background image is applied correctly', async ({ page }) => {
    await page.goto('./home-page.html', { waitUntil: 'networkidle' });
  
    const element = page.locator('body'); // or whatever element has the background
    const bgImage = await element.evaluate(el =>
      window.getComputedStyle(el).backgroundImage
    );
  
    console.log('Background Image:', bgImage);
  
    expect(bgImage).toContain('geisel-base-theme.png');
  });