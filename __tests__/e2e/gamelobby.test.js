describe("Walking in Game Lobby ", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/game-lobby.html");
  });

  
  // Basic Html Structure Test(Btn, title, etc)
  // Check all the buttons are here
  
  // sanity check
  it("Checking the page title", async()=>{
    // I changes the title into more descriptive one...
    expect(await page.title()).toBe("Club Triton | Game Lobby");
  });

  it("Is there a card-jitsu btn?", async()=>{
    const cj_btn = await page.$("#card-jitsu");
    expect(cj_btn).not.toBeNull();
  });
  
  it("Is there a door btn?", async()=>{
    const door_btn = await page.$("#door");
    expect(door_btn).not.toBeNull();
  });
  
  it("Is there a instructions btn?", async()=>{
    const instruc_btn = await page.$("#instructions");
    expect(instruc_btn).not.toBeNull();
  });

  it("Is there a deck btn?", async()=>{
    const deck_btn = await page.$("#deck");
    expect(deck_btn).not.toBeNull();
  });
  
  // Click the button and goes to?
    //curently only this button works, add more test when more button is added
  it("Clicking card-jitsu button? Should go to game-select:", async()=>{
    const cj_btn = await page.$("#card-jitsu");
    await cj_btn.click();

    // wait the page to load
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 });

    expect(await page.title()).toBe("Document"); // this should be the title of the page
    
    // go back to game-lobby
    page.goBack()
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 });
  });
});
