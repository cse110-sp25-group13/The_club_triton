import { test, expect } from '@playwright/test';

test.describe.parallel('Card Collection Page', () => {
    const pagePath = './collection-page.html';

    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath, { waitUntil: 'networkidle' });
    });

    test('loads page with correct title', async ({ page }) => {
        await expect(page).toHaveTitle('Card Collection & Deck Builder - TritonCard');
    });

    test('navbar loads expected content', async ({ page }) => {
        const navbarItem = page.locator('#navbar-container nav')
    
        await expect(navbarItem).toBeVisible({ timeout: 5000 });
    });

    test('displays dynamically loaded cards', async ({ page }) => {
        const cards = page.locator('#card-collection-container');
        await expect(cards.first()).toBeVisible({ timeout: 5000 });
        const count = await cards.count();
        await expect(count).toBeGreaterThan(0);
    });

    test('toggles card in deck and updates count', async ({ page }) => {
        const cards = page.locator('#card-collection-container');
        const deckCount = page.locator('#deck-count');

        await expect(cards.first()).toBeVisible();

        const initialCount = parseInt(await deckCount.textContent(), 10);
        await page.pause();
        
        await page.waitForTimeout(300);
        if (page.context().browser().browserType().name() === 'firefox') {
            await page.screenshot({ path: 'before-click.png' });
            await cards.first().click({ force: true });
            await page.screenshot({ path: 'after-click.png' });
          } else {
            await cards.first().click();
        }
        await page.waitForTimeout(300);
        const afterAddCount = parseInt(await deckCount.textContent(),10);
        expect(afterAddCount).toBe(initialCount + 1);

        await page.waitForTimeout(100);
        if (page.context().browser().browserType().name() === 'firefox') {
            await cards.first().click({ force: true });
          } else {
            await cards.first().click();
        }
        await page.waitForTimeout(300);
        const afterRemoveCount = parseInt(await deckCount.textContent(), 10);
        expect(afterRemoveCount).toBe(initialCount);
    });
})