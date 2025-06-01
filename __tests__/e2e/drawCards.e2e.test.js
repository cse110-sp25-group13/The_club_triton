/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";

describe("Draw Cards E2E", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    // point to your actual page
    await page.goto("http://localhost:8080/src/pages/game-page.html");
  }, 30000);

  afterAll(async () => {
    if (browser) {
      await browser.close(); // ✅ Always guard with a check
    }
  });

  test("deals 5 player cards immediately", async () => {
    // wait for 5 <triton-card> in the player hand container
    // wait until the predicate returns true, or time out after 10s
    await page.waitForFunction(
      () =>
        document.querySelectorAll("#student-cards triton-card").length === 5,
      { timeout: 10000 },
    );
    const count = await page.$$eval(
      "#player-hand-cards triton-card",
      (els) => els.length,
    );
    expect(count).toBe(5);
  });

  test("deals 5 AI cards as backs immediately", async () => {
    // wait until each of the 5 ai cells has a <triton-card> child
    await page.waitForFunction(() => {
      const cells = Array.from(document.querySelectorAll(".ai-deck .ai-card"));
      return cells.every((td) => td.querySelector("triton-card"));
    });

    // collect src attrs of those cards
    const aiSrcs = await page.$$eval(".ai-deck .ai-card triton-card", (els) =>
      els.map((el) => el.getAttribute("src")),
    );
    // all should be the back-of-card image
    aiSrcs.forEach((src) => {
      expect(src).toMatch("src/card/card-back.png");
    });

    // and there should be exactly 5
    expect(aiSrcs).toHaveLength(5);
  });
});
