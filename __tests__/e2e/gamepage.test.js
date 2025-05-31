describe("Walking in Game Page  ", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/game-page.html");
  });

  // sanity check
  it("Checking the page title", async()=>{
    // I changes the title into more descriptive one, the original sounds like a slogan
    expect(await page.title()).toBe("Club Triton | Playing card-jitsu");

  });


  // initial setup checks
  it("Check if Players have 5 cards?", async()=>{
    const player_cards = await page.$(".student-cards");
    expect(player_cards).not.toBeNull(); //player cards must exist

    // player get 5 cards
    const cards = await player_cards.$$(".card")
    expect(cards.length).toBe(5)

  });
 
  // This may fails due to not using actual <card> component for reprsenting the AI's hands
  // There are some trade offs of using CardBack img as Place Holder vs actually putting the <card>
  // So Ignore or delete this test for now
  it("Check if Prof have 5 cards?", async()=>{
    const prof_cards = await page.$(".prof-cards");
    expect(prof_cards).not.toBeNull(); //player cards must exist

    // player get 5 cards 
    const cards = await prof_cards.$$(".card")
    expect(cards.length).toBe(5)

  });
  
  // interaction check
  it("Exit Button exist?", async()=>{
    const exit_btn = await page.$("#exit-btn");
    expect(exit_btn).not.toBeNull()
  });

  // Why we cannot exit? LET ME OUT !!!
  it("Click Exit Button, expecting go to home page", async()=>{
    const exit_btn = await page.$("#exit-btn");
    expect(exit_btn).not.toBeNull() // Safty measure
    await exit_btn.click();

    // wait the page to load
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 });
    expect(await page.title()).toBe("Home");

    //go back to game 
    await page.goBack()
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 });
  });

});
