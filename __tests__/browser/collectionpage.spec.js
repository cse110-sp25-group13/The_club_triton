import { test, expect } from "@playwright/test";

test.describe.parallel("Card Collection Page", () => {
  const pagePath = "./collection-page.html";

  test.beforeEach(async ({ page }) => {
    await page.goto(pagePath, { waitUntil: "networkidle" });
  });

  test("loads page with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Card Collection & Deck Builder - TritonCard",
    );
  });

  test("navbar loads expected content", async ({ page }) => {
    const navbarItem = page.locator("#navbar-container nav");

    await expect(navbarItem).toBeVisible({ timeout: 5000 });
  });

  test("displays dynamically loaded cards", async ({ page }) => {
    const cards = page.locator("#card-collection-container");
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    const count = await cards.count();
    await expect(count).toBeGreaterThan(0);
  });

  test("toggles card in deck and updates count", async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === "firefox",
      "Skipping test on Firefox due to known click issues",
    );

    const cards = page.locator("#card-collection-container");
    const deckCount = page.locator("#deck-count");

    await expect(cards.first()).toBeVisible();

    const getCount = async () => parseInt(await deckCount.textContent(), 10);
    const clickCard = async () => {
      await cards.first().click();
    };

    const initialCount = await getCount();

    await clickCard();
    await page.waitForTimeout(200); // allow DOM update
    const afterAddCount = await getCount();
    expect(afterAddCount).toBe(initialCount + 1);

    await clickCard();
    await page.waitForTimeout(200); // allow DOM update
    const afterRemoveCount = await getCount();
    expect(afterRemoveCount).toBe(initialCount);
  });
});
