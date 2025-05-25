import puppeteer from "puppeteer";

describe("Sanity check for game-lobby.html", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it("loads the game lobby page and has correct title", async () => {
    await page.goto("http://localhost:8080/game-lobby.html");
    const title = await page.title();
    expect(title).toBe("Document");
  });

  it("finds the Card-Jitsu button on the page", async () => {
    await page.goto("http://localhost:8080/game-lobby.html");
    const button = await page.$("#card-jitsu");
    expect(button).toBeTruthy();
  });
});
