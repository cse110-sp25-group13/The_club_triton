describe("Walking in Home Page (feel like home) ", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080/home-page.html");
  });

  // Basic Html Structure Test(Btn, title, etc)
  // Check all the buttons are here
  
  // sanity check
  it("Checking the page title", async()=>{
    // I changes the title for consistency for other stuff...
    expect(await page.title()).toBe("Club Triton | Home");
  });

  it("Is there a navagation bar?", async()=>{
    const navbar = await page.$(".navbar");
    expect(navbar).not.toBeNull();
  });

});
