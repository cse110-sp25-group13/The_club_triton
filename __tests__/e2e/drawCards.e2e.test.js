describe("Draw Cards E2E", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/src/pages/game-page.html");
  }, 20000);

  test("deals 5 player cards immediately", async () => {
    const count = await page.$$eval(
      "td[id^='student-card-']",
      (els) => els.length,
    );
    expect(count).toBe(5);
  });

  test("deals 5 prof cards immediately", async () => {
    const srcList = await page.$$eval(
      "td[id^='prof-card-'] triton-card",
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
