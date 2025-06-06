describe("Draw Cards E2E", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/src/pages/game-page.html");
    await page.coverage.startJSCoverage();
  }, 20000);

  afterAll(async () => {
    await page.coverage.stopJSCoverage();
  });

  it("deals 5 player cards immediately", async () => {
    const count = await page.$$eval(
      "div[id^='student-card-']",
      (els) => els.length,
    );
    expect(count).toBe(5);
  });

  it("deals 5 prof cards immediately", async () => {
    const srcList = await page.$$eval(
      "div[id^='prof-card-'] triton-card",
      (cards) =>
        cards.map((card) => {
          const img = card.shadowRoot.querySelector("#img-card-border");
          return img ? img.getAttribute("src") : null;
        }),
    );
    expect(srcList.length).toBe(5);
    expect(srcList.every((src) => src !== null)).toBe(true);
  }, 20000);
});
