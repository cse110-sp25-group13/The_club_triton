**Documentation: Testing IndexedDB Card Functions in the Browser Console**

**Objective:**
This document outlines the steps to test the core IndexedDB functions responsible for initializing the card database (`initDB`), retrieving all cards (`getAllCards`), and fetching a specific card by its ID (`getCardById`). These tests are performed directly in the browser's developer console.

**Prerequisites:**

1.  The HTML page that loads `card-system.js` (or the relevant JavaScript file containing the IndexedDB functions and `initialCardData`) is open in a web browser.
2.  The `initialCardData` array is defined within the accessible scope.
3.  The `initDB()`, `getAllCards()`, and `getCardById()` functions are correctly implemented in the loaded JavaScript file.

**Testing Steps:**

1.  **Open Developer Tools:**

    - In your web browser, open the Developer Tools (usually by pressing `F12` or right-clicking on the page and selecting "Inspect").
    - Navigate to the **Console** tab.

2.  **(Optional but Recommended for a Clean Test) Clear Existing IndexedDB Data:**

    - Go to the "Application" (or "Storage") tab in the Developer Tools.
    - Find "IndexedDB" in the left-hand navigation panel.
    - Locate the `UCSDCardsDB` database (it might be listed under your site's domain).
    - Select the database and click the "Delete database" button.
    - Refresh the web page. This ensures that `initDB()` will trigger the `onupgradeneeded` event to recreate the object store and populate initial data.

3.  **Execute Test Script in Console:**

    - Copy and paste the following JavaScript code block into the browser console and press `Enter` to execute it. This script will sequentially call `initDB()`, then `getAllCards()`, and then `getCardById()` for both an existing and a non-existing card ID.

    ```javascript
    // --- Start of Test Script ---
    console.log("Attempting to initialize database...");
    initDB()
      .then((databaseInstance) => {
        console.log(
          "Database initialized successfully! Ready for read tests.",
          databaseInstance,
        );

        // Test getAllCards()
        console.log("\nTesting getAllCards()...");
        return getAllCards();
      })
      .then((allCards) => {
        console.log("--- Result of getAllCards() ---");
        if (allCards && allCards.length > 0) {
          console.log(`Successfully retrieved ${allCards.length} cards.`);
          console.table(allCards);
        } else if (allCards) {
          console.log(
            "getAllCards() returned an empty array. No cards found or database might be empty.",
          );
        } else {
          console.log("getAllCards() did not return a valid array.");
        }

        // Test getCardById() - for an existing card
        // IMPORTANT: Replace 'structure001' with an actual ID from your initialCardData
        const existingCardId = "structure001";
        console.log(`\nTesting getCardById('${existingCardId}')...`);
        return getCardById(existingCardId);
      })
      .then((card) => {
        console.log(
          `--- Result of getCardById('${card ? card.id : "structure001"}') ---`,
        );
        if (card) {
          console.log("Found card:", card);
        } else {
          console.error(
            `Card with ID 'structure001' was NOT found, but it should exist! Check data or logic.`,
          );
        }

        // Test getCardById() - for a non-existent card
        const nonExistentCardId = "nonexistent000";
        console.log(`\nTesting getCardById('${nonExistentCardId}')...`);
        return getCardById(nonExistentCardId);
      })
      .then((card) => {
        console.log(
          `--- Result of getCardById('${card ? card.id : "nonexistent000"}') ---`,
        );
        if (card) {
          console.error(
            `Card with ID 'nonexistent000' WAS found, but it should NOT exist! Check logic or data.`,
          );
        } else {
          console.log(
            "Card with ID 'nonexistent000' not found, as expected. Test PASSED!",
          );
        }
        console.log("\n--- All tests completed ---");
      })
      .catch((error) => {
        console.error("An error occurred during the testing process:", error);
      });
    // --- End of Test Script ---
    ```

4.  **Analyze Console Output:**

    - **Initialization Logs:** Look for messages like "Attempting to initialize database...", "Upgrade needed or database creation...", "Object store 'cards' created.", "Card '...' added.", and "Database initialized successfully!".
    - **`getAllCards()` Output:**
      - A message "Successfully retrieved X cards." where X is the number of cards in `initialCardData`.
      - A table (from `console.table(allCards)`) displaying all card objects and their properties. Verify the data matches your `initialCardData`.
    - **`getCardById(existingCardId)` Output:**
      - A message "Found card:" followed by the JavaScript object for the card with the specified existing ID. Verify its details.
    - **`getCardById(nonExistentCardId)` Output:**
      - A message "Card with ID 'nonexistent000' not found, as expected. Test PASSED!".
    - **Error Messages:** Check for any red error messages in the console. These might indicate problems with database initialization, transactions, or the logic within your functions.

5.  **(Optional) Verify Data in Application Tab:**
    - After running the tests, you can go back to the "Application" > "IndexedDB" > `UCSDCardsDB` > `cards` object store in the developer tools to visually inspect the data and confirm it matches your expectations.

**Expected Outcome:**
If all functions are working correctly, the console output should show successful initialization, a table of all cards, the details of the fetched existing card, and a "not found" message for the non-existent card, all without any critical error messages related to IndexedDB operations.
