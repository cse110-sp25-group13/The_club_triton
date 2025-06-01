**Technical Documentation: IndexedDB Card Storage Module**

**Author:** Chencheng Li

**Date:** May 28, 2025

**Version:** 1.1

**1. Overview**

This module is responsible for the client-side storage and retrieval of game card data for the UCSD College Card Compare project. It utilizes **IndexedDB** to persist card information. This includes a master list of all available game cards and a separate store for cards owned by the player. Key functionalities allow for offline access, efficient data management, and user-specific collection tracking.

All core functionalities are currently encapsulated within `src/scripts/card-system.js` (or your actual file path).

**2. Key Features Implemented**

- **Database Initialization:** Sets up the `UCSDCardsDB` IndexedDB database with necessary object stores.
- **Initial Master Card Data Population:** Populates the `cards` object store with a predefined set of static card data from a JSON file upon initial database creation.
- **Master Card Data Retrieval:** Provides asynchronous functions to fetch all cards or a specific card by its ID from the master list.
- **Player Card Collection Management:** Provides asynchronous functions to add cards to a player's collection, remove cards from it, and retrieve the list of owned card IDs or full card objects.

**3. Card Data Structure**

_The system uses two separate object stores:_

**Master Card Store (`cards`):**
Each card object stored in the `cards` object store adheres to the following JSON-like structure:

```javascript
{
  "id": "string", // Unique identifier for the card (e.g., "structure001") - Primary Key
  "name": "string", // Display name of the card (e.g., "Geisel Library")
  "type": "string", // Category of the card (e.g., "Structure", "Dining", "Mascot")
  "ranking": "number", // Numeric ranking (1-5) for same-type comparison
  "rarity": "number", // Numeric rarity (1-5 stars)
  "front_image_placeholder": "string", // URL/path to the front image placeholder
  "back_image_placeholder": "string",  // URL/path to the back image placeholder
  "description": "string", // A fun description of the card
  "border_color_code": "string" // Hex or CSS color code for the type-specific border
}
```

**Player Collection Store (`playerOwnedCards`):**
Player-owned cards are tracked with minimal objects:

```javascript
{
  "cardId": "string", // References the id from the master cards store - Primary Key
  "count": "number" // Number of copies the player owns (default: 1)
}
```

_Note: The `initialCardData` array defining master cards is currently located in `src/card-system.js` but may be moved to a separate JSON file in the future._

**4. Core API / Functions**

The following asynchronous functions are provided by this module. They all return Promises.

- **`initDB()`**

  - **Description:** Initializes the `UCSDCardsDB` database with both `cards` and `playerOwnedCards` object stores. If the database or object stores do not exist, they are created. If the `cards` object store is created for the first time, it is populated with the `initialCardData`.
  - **Usage:** This function should be called once when the application starts to ensure the database is ready before any other card data operations are performed.
  - **Returns:** `Promise<IDBDatabase>` - A promise that resolves with the `IDBDatabase` instance upon successful initialization, or rejects with an error.
  - **Example Call:**
    ```javascript
    initDB()
      .then((dbInstance) => {
        console.log("Database is ready:", dbInstance);
        // Proceed with other operations
      })
      .catch((error) => {
        console.error("Failed to initialize database:", error);
      });
    ```

- **`getAllCards()`**

  - **Description:** Retrieves all card objects stored in the master `cards` object store.
  - **Prerequisite:** `initDB()` must have been successfully called and resolved.
  - **Returns:** `Promise<Array<Object>>` - A promise that resolves with an array of all card objects, or rejects with an error.
  - **Example Call:**
    ```javascript
    getAllCards()
      .then((allCardsArray) => {
        console.log("All cards:", allCardsArray);
        // Use the array of cards
      })
      .catch((error) => {
        console.error("Error fetching all cards:", error);
      });
    ```

- **`getCardById(cardId)`**

  - **Description:** Retrieves a single card object from the master `cards` object store based on its unique `id`.
  - **Parameters:**
    - `cardId` (string): The unique ID of the card to retrieve.
  - **Prerequisite:** `initDB()` must have been successfully called and resolved.
  - **Returns:** `Promise<Object|undefined>` - A promise that resolves with the card object if found, or `undefined` if no card with the given ID exists. It rejects with an error if the operation fails.
  - **Example Call:**
    ```javascript
    getCardById("structure001")
      .then((cardObject) => {
        if (cardObject) {
          console.log("Found card:", cardObject);
          // Use the card object
        } else {
          console.log("Card not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching card by ID:", error);
      });
    ```

- **`addCardToCollection(cardId, count = 1)`**

  - **Description:** Adds a card to the player's collection or increases the count if the card is already owned.
  - **Parameters:**
    - `cardId` (string): The unique ID of the card to add to the collection.
    - `count` (number, optional): The number of copies to add (default: 1).
  - **Prerequisite:** `initDB()` must have been successfully called and resolved. The card must exist in the master `cards` store.
  - **Returns:** `Promise<void>` - A promise that resolves when the operation completes successfully, or rejects with an error.
  - **Example Call:**
    ```javascript
    addCardToCollection("structure001", 2)
      .then(() => {
        console.log("Card added to collection successfully!");
      })
      .catch((error) => {
        console.error("Error adding card to collection:", error);
      });
    ```

- **`removeCardFromCollection(cardId, count = 1)`**

  - **Description:** Removes a card from the player's collection or decreases the count. If the count reaches zero or below, the card is completely removed from the collection.
  - **Parameters:**
    - `cardId` (string): The unique ID of the card to remove from the collection.
    - `count` (number, optional): The number of copies to remove (default: 1).
  - **Prerequisite:** `initDB()` must have been successfully called and resolved.
  - **Returns:** `Promise<void>` - A promise that resolves when the operation completes successfully, or rejects with an error.
  - **Example Call:**
    ```javascript
    removeCardFromCollection("structure001", 1)
      .then(() => {
        console.log("Card removed from collection successfully!");
      })
      .catch((error) => {
        console.error("Error removing card from collection:", error);
      });
    ```

- **`getOwnedCardIds()`**

  - **Description:** Retrieves an array of all card IDs that the player currently owns.
  - **Prerequisite:** `initDB()` must have been successfully called and resolved.
  - **Returns:** `Promise<Array<string>>` - A promise that resolves with an array of card IDs, or rejects with an error.
  - **Example Call:**
    ```javascript
    getOwnedCardIds()
      .then((ownedIds) => {
        console.log("Owned card IDs:", ownedIds);
        // Use the array of IDs
      })
      .catch((error) => {
        console.error("Error fetching owned card IDs:", error);
      });
    ```

- **`getOwnedFullCards()`**

  - **Description:** Retrieves an array of full card objects for all cards that the player currently owns, including ownership count information.
  - **Prerequisite:** `initDB()` must have been successfully called and resolved.
  - **Returns:** `Promise<Array<Object>>` - A promise that resolves with an array of card objects enriched with `ownedCount` property, or rejects with an error.
  - **Example Call:**
    ```javascript
    getOwnedFullCards()
      .then((ownedCards) => {
        console.log("Owned cards with details:", ownedCards);
        ownedCards.forEach(card => {
          console.log(`${card.name}: ${card.ownedCount} copies`);
        });
      })
      .catch((error) => {
        console.error("Error fetching owned cards:", error);
      });
    ```

**5. Database Details**

- **Database Name:** `UCSDCardsDB`
- **Current Version:** `2` (as defined by `DB_VERSION` constant in `card-system.js`)
- **Object Stores:**
  - `cards`: Stores all master card definition objects.
    - **Key Path:** `id`
    - **Purpose:** Contains the complete card database with all available cards
  - `playerOwnedCards`: Stores player collection data.
    - **Key Path:** `cardId`
    - **Purpose:** Tracks which cards the player owns and how many copies

**6. Testing**

Refer to `docs/testing_indexeddb_functions.md` for detailed steps on how to test these functions using the browser's developer console. The tests cover database initialization, data population, retrieval of all cards, retrieval of individual cards by ID, and collection management operations (adding/removing cards, retrieving owned cards).

**7. Future Considerations / Potential Improvements**

- Move `initialCardData` to an external JSON file for easier management.
- Implement functions for adding new cards or updating existing master cards post-initialization (if required by future features like content updates).
- Add more specific error handling and user feedback mechanisms.
- Consider adding indexes for `type` or `name` if frequent querying on these fields becomes necessary.
- Implement collection statistics and analytics functions (total cards owned, completion percentage, etc.).
- Add bulk operations for collection management (add/remove multiple cards at once).
