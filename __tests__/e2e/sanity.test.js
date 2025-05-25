describe('Game Lobby sanity check', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080/game-lobby.html');
  });

  it('loads with correct title', async () => {
    expect(await page.title()).toBe('Document');
  });

  it('finds the Card-Jitsu button', async () => {
    expect(await page.$('#card-jitsu')).toBeTruthy();
  });
});