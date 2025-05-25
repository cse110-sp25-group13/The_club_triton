describe('Game Lobby sanity check', () => {
  beforeAll(async () => {
    // dev-server will have started http-server at localhost:8080
    await page.goto('http://localhost:8080/game-lobby.html');
  });

  it('should load with the correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Document');
  });

  it('should find the Card-Jitsu button', async () => {
    const btn = await page.$('#card-jitsu');
    expect(btn).toBeTruthy();
  });
});