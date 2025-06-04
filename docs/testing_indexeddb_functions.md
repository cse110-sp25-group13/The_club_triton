**Documentation: Testing IndexedDB Card Functions in the Browser Console**

**Objective:**
This document outlines the steps to test the core IndexedDB functions responsible for initializing the card database (`initDB`), retrieving all cards (`getAllCards`), fetching a specific card by its ID (`getCardById`), and managing player card collections (`addCardToCollection`, `removeCardFromCollection`, `getOwnedCardIds`, `getOwnedFullCards`). These tests are performed directly in the browser's developer console.

**Prerequisites:**

1.  The HTML page that loads `card-system.js` (or the relevant JavaScript file containing the IndexedDB functions and `initialCardData`) is open in a web browser.
2.  The `initialCardData` array is defined within the accessible scope.
3.  All IndexedDB functions are correctly implemented in the loaded JavaScript file.

**Testing Steps:**

1.  **Open Developer Tools:**

    - In your web browser, open the Developer Tools (usually by pressing `F12` or right-clicking on the page and selecting "Inspect").
    - Navigate to the **Console** tab.

2.  **(Optional but Recommended for a Clean Test) Clear Existing IndexedDB Data:**

    - Go to the "Application" (or "Storage") tab in the Developer Tools.
    - Find "IndexedDB" in the left-hand navigation panel.
    - Locate the `UCSDCardsDB` database (it might be listed under your site's domain).
    - Select the database and click the "Delete database" button.
    - Refresh the web page. This ensures that `initDB()` will trigger the `onupgradeneeded` event to recreate the object stores and populate initial data.

3.  **Execute Basic Card Retrieval Test Script:**

    - Copy and paste the following JavaScript code block into the browser console and press `Enter` to execute it. This script will test basic card database operations.

    ```javascript
    // --- Start of Basic Test Script ---
    console.log("=== BASIC CARD DATABASE TESTS ===");
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
        console.log("\n=== BASIC TESTS COMPLETED ===");
      })
      .catch((error) => {
        console.error("An error occurred during the basic testing process:", error);
      });
    // --- End of Basic Test Script ---
    ```

4.  **Execute Collection Management Test Script:**

    - After the basic tests complete successfully, copy and paste the following script to test collection management features:

    ```javascript
    // --- Start of Collection Management Test Script ---
    console.log("\n=== COLLECTION MANAGEMENT TESTS ===");
    
    // Test adding cards to collection
    console.log("Testing addCardToCollection()...");
    addCardToCollection("structure001", 2)
      .then(() => {
        console.log("✓ Successfully added 2 copies of structure001 to collection");
        return addCardToCollection("dining001", 1);
      })
      .then(() => {
        console.log("✓ Successfully added 1 copy of dining001 to collection");
        
        // Test retrieving owned card IDs
        console.log("\nTesting getOwnedCardIds()...");
        return getOwnedCardIds();
      })
      .then((ownedIds) => {
        console.log("--- Owned Card IDs ---");
        console.log("Owned card IDs:", ownedIds);
        console.log(`Total unique cards owned: ${ownedIds.length}`);
        
        // Test retrieving full owned cards
        console.log("\nTesting getOwnedFullCards()...");
        return getOwnedFullCards();
      })
      .then((ownedCards) => {
        console.log("--- Owned Cards with Full Details ---");
        console.log("Owned cards with details:");
        console.table(ownedCards);
        ownedCards.forEach(card => {
          console.log(`${card.name}: ${card.ownedCount} copies`);
        });
        
        // Test removing cards from collection
        console.log("\nTesting removeCardFromCollection()...");
        return removeCardFromCollection("structure001", 1);
      })
      .then(() => {
        console.log("✓ Successfully removed 1 copy of structure001 from collection");
        
        // Verify the count decreased
        console.log("\nVerifying count after removal...");
        return getOwnedFullCards();
      })
      .then((ownedCards) => {
        console.log("--- Updated Owned Cards ---");
        console.table(ownedCards);
        
        const structure001 = ownedCards.find(card => card.id === "structure001");
        if (structure001 && structure001.ownedCount === 1) {
          console.log("✓ Card count correctly decreased to 1");
        } else {
          console.error("✗ Card count was not updated correctly");
        }
        
        // Test removing all copies of a card
        console.log("\nTesting complete removal of a card...");
        return removeCardFromCollection("structure001", 1);
      })
      .then(() => {
        console.log("✓ Successfully removed last copy of structure001");
        
        // Verify the card is no longer in collection
        return getOwnedCardIds();
      })
      .then((ownedIds) => {
        console.log("--- Final Owned Card IDs ---");
        console.log("Remaining owned card IDs:", ownedIds);
        
        if (!ownedIds.includes("structure001")) {
          console.log("✓ structure001 correctly removed from collection");
        } else {
          console.error("✗ structure001 still appears in collection");
        }
        
        // Test error handling - try to add a non-existent card
        console.log("\nTesting error handling with non-existent card...");
        return addCardToCollection("nonexistent999");
      })
      .then(() => {
        console.error("✗ Adding non-existent card should have failed but didn't");
      })
      .catch((error) => {
        console.log("✓ Correctly handled error for non-existent card:", error.message);
        
        console.log("\n=== ALL COLLECTION TESTS COMPLETED ===");
        console.log("🎉 Collection management system is working correctly!");
      });
    // --- End of Collection Management Test Script ---
    ```

5.  **Analyze Console Output:**

    **Basic Tests:**
    - **Initialization Logs:** Look for messages like "Attempting to initialize database...", "Upgrade needed or database creation...", "Object store 'cards' created.", "Object store 'playerOwnedCards' created.", and "Database initialized successfully!".
    - **`getAllCards()` Output:** A message "Successfully retrieved X cards." where X is the number of cards in `initialCardData`, plus a table displaying all card objects.
    - **`getCardById()` Output:** Successful retrieval of existing cards and appropriate "not found" messages for non-existent cards.

    **Collection Management Tests:**
    - **Add Operations:** Success messages for adding cards to collection
    - **Retrieval Operations:** 
      - `getOwnedCardIds()` should show array of owned card IDs
      - `getOwnedFullCards()` should show table with card details plus `ownedCount` property
    - **Remove Operations:** Success messages for removing cards and verification of count changes
    - **Error Handling:** Appropriate error messages when trying to add non-existent cards

6.  **(Optional) Verify Data in Application Tab:**
    - After running the tests, go to "Application" > "IndexedDB" > `UCSDCardsDB` in developer tools
    - Check both `cards` (master data) and `playerOwnedCards` (collection data) object stores
    - Verify the data matches your test expectations

**Expected Outcome:**
If all functions are working correctly, you should see:
- Successful database initialization with both object stores
- Proper card retrieval from master store
- Successful collection management operations with accurate count tracking
- Appropriate error handling for invalid operations
- Clean console output with ✓ marks for passing tests and detailed verification logs

**Troubleshooting:**
- If tests fail, check the browser console for specific error messages
- Ensure `initialCardData` contains cards with IDs referenced in the test scripts
- Verify that the database version has been properly incremented to trigger schema updates
- Clear IndexedDB data completely if you encounter schema-related issues
