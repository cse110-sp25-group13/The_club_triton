describe("Site Navigation E2E", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/src/pages/home-page.html");
    await page.coverage.startJSCoverage();
  }, 20000);

  afterAll(async () => {
    await page.coverage.stopJSCoverage();
  });

  it("navs home -> game", async () => {
    await page.click('a[href="../pages/game-page.html"]');

    await page.waitForSelector("#instructions");

    const currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:8080/src/pages/game-page.html");
  }, 10000);

  it("navs home -> collection -> game -> home", async () => {
    await page.click('a[href="../pages/collection-page.html"]');

    await page.waitForSelector("#card-collection-container");

    let currentUrl = page.url();
    expect(currentUrl).toBe(
      "http://localhost:8080/src/pages/collection-page.html",
    );

    await page.click('a[href="../pages/game-page.html"]');

    await page.waitForSelector("#instructions");

    currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:8080/src/pages/game-page.html");

    await page.click('a[href="../pages/home-page.html"]');

    await page.waitForSelector(".game-title-container");

    currentUrl = page.url();
    expect(currentUrl).toBe("http://localhost:8080/src/pages/home-page.html");
  }, 10000);
});
