**Technical Documentation: IndexedDB Card Storage Module**

**Author:** Chencheng Li

**Date:** May 17, 2025

**Version:** 1.0

**1. Overview**

This module is responsible for the client-side storage and retrieval of game card data for the UCSD College Card Compare project. It utilizes **IndexedDB** to persist card information, allowing for offline access and efficient data management. The primary goal is to provide a stable and accessible source of card data for other game components, such as the card display elements and game logic.

All core functionalities are currently encapsulated within `src/card-system.js` (or your actual file path).

**2. Key Features Implemented**

- **Database Initialization:** Sets up the `UCSDCardsDB` IndexedDB database with a `cards` object store.
- **Initial Data Population:** Populates the `cards` object store with a predefined set of static card data upon initial database creation.
- **Data Retrieval:** Provides asynchronous functions to fetch all cards or a specific card by its ID.

**3. Card Data Structure**

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

_Note: The `initialCardData` array defining these cards is currently located in `src/card-system.js` but may be moved to a separate JSON file in the future._

**4. Core API / Functions**

The following asynchronous functions are provided by this module. They all return Promises.

- **`initDB()`**

  - **Description:** Initializes the `UCSDCardsDB` database and the `cards` object store. If the database or object store does not exist, they are created. If the `cards` object store is created for the first time, it is populated with the `initialCardData`.
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

  - **Description:** Retrieves all card objects stored in the `cards` object store.
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
  - **Description:** Retrieves a single card object from the `cards` object store based on its unique `id`.
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

**5. Database Details**

- **Database Name:** `UCSDCardsDB`
- **Current Version:** `1` (as defined by `DB_VERSION` constant in `card-system.js`)
- **Object Stores:**
  - `cards`: Stores all card definition objects.
    - **Key Path:** `id`

**6. Testing**

Refer to `docs/testing_indexeddb_functions.md` for detailed steps on how to test these functions using the browser's developer console. The tests cover database initialization, data population, retrieval of all cards, and retrieval of individual cards by ID (both existing and non-existing).

**7. Future Considerations / Potential Improvements**

- Move `initialCardData` to an external JSON file for easier management.
- Implement functions for adding new cards or updating existing cards post-initialization (if required by future features like Gacha system).
- Add more specific error handling and user feedback mechanisms.
- Consider adding indexes for `type` or `name` if frequent querying on these fields becomes necessary.
