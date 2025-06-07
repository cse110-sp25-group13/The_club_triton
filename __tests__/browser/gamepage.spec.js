import { test, expect } from "@playwright/test";

test.describe.parallel("Game page loads, ui elements are visible", () => {
  const pagePath = "./game-page.html";

  test.beforeEach(async ({ page }) => {
    await page.goto(pagePath, { waitUntil: "networkidle" });
  });

  test("loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Play Now! | Club Triton");
  });

  test("navbar loads expected content", async ({ page }) => {
    const navbarItem = page.locator("#navbar-container nav");

    await expect(navbarItem).toBeVisible({ timeout: 5000 });
  });

  test("restart button is visible and clickable", async ({ page }) => {
    const restartButton = page.locator("#restart-btn");
    await expect(restartButton).toBeVisible();
    await restartButton.click();
  });

  test("next button is visible after rolling projector down", async ({
    page,
  }) => {
    const nextBtn = page.locator(".next-btn");
    await expect(nextBtn).toBeVisible(); // It might be visible but disabled initially

    const screenHandle = page.locator(".screen-handle");
    await screenHandle.click();

    await expect(nextBtn).toBeEnabled();
  });

  test("slide navigation works", async ({ page }) => {
    const screenHandle = page.locator(".screen-handle");
    await screenHandle.click();

    const nextBtn = page.locator(".next-btn");
    const prevBtn = page.locator(".prev-btn");

    // Next should be enabled now
    await expect(nextBtn).toBeEnabled();

    // Prev should still be disabled because first slide
    await expect(prevBtn).toBeDisabled();

    // Click next slide
    await nextBtn.click();

    // Now prev should be enabled
    await expect(prevBtn).toBeEnabled();
  });
});
