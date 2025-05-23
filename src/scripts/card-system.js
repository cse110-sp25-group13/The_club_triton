const initialCardData = [
  {
    "id": "structure001", // Suggest ID reflects type and uniqueness
    "name": "Geisel Library",
    "type": "Structure", // Ensure consistent type naming
    "ranking": 5,
    "rarity": 4,
    "front_image_placeholder": "assets/images/placeholders/geisel_front.png", // Assume placeholder image at this path
    "back_image_placeholder": "assets/images/placeholders/geisel_back.png",
    "description": "The iconic anechoic bird of UCSD's libraries.", // Confirm description content
    "border_color_code": "#003A70" // Confirm Structure type color
  },
  {
    "id": "dining001",
    "name": "Price Center Food Court",
    "type": "Dining",
    "ranking": 4,
    "rarity": 3,
    "front_image_placeholder": "assets/images/placeholders/pc_food_front.png",
    "back_image_placeholder": "assets/images/placeholders/pc_food_back.png",
    "description": "A place for every craving, and every student.",
    "border_color_code": "#FFCD00" // Confirm Dining type color
  },
  {
    "id": "mascot001",
    "name": "King Triton",
    "type": "Mascot", 
    "ranking": 5, // Mascot ranking may have a different meaning, or not used for direct comparison
    "rarity": 5,
    "front_image_placeholder": "assets/images/placeholders/triton_front.png",
    "back_image_placeholder": "assets/images/placeholders/triton_back.png",
    "description": "The mighty ruler of the Tritons.",
    "border_color_code": "#006A4E" // Confirm Mascot type color
  }
  // Continue to add more cards as required (5 per type, 15 total)...
];

// export default initialCardData; // If using ES modules
// or module.exports = initialCardData; // If using CommonJS (Node.js)
// For now, just define it in this file.

let db; // Global variable to hold the database instance (for simplicity; in real projects, use better state management)
const DB_NAME = 'UCSDCardsDB';
const DB_VERSION = 1; // Database version
const STORE_NAME = 'cards'; // Object store name

/**
 * Initialize the IndexedDB database.
 * If the database or object store does not exist, create them and populate with initial data.
 * @returns {Promise<IDBDatabase>}
 */
function initDB() {
  return new Promise((resolve, reject) => {
    // 1. Open the database
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    // Triggered when the database is successfully opened
    request.onsuccess = (event) => {
      db = event.target.result; // Save the database instance to the global variable
      console.log(`Successfully opened database: ${DB_NAME} version ${db.version}`);
      resolve(db); // Return the database instance
    };

    // Triggered when a higher version is requested or the database is created for the first time
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      console.log(`Upgrade needed or database creation for: ${DB_NAME}`);

      // 2. Create object store if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Use 'id' property as the primary key (keyPath)
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        console.log(`Object store "${STORE_NAME}" created.`);

        // (Optional) Create indexes for other properties if you need to query by them
        // objectStore.createIndex('name', 'name', { unique: false });
        // objectStore.createIndex('type', 'type', { unique: false });
        // console.log('Indexes created for "name" and "type".');

        // 3. Populate object store with initial data
        // This should only run when the object store is first created
        console.log('Populating object store with initial data...');
        initialCardData.forEach(card => {
          // onupgradeneeded event automatically handles the transaction, so we can operate on objectStore directly
          const addRequest = objectStore.add(card); 
          addRequest.onsuccess = () => console.log(`Card "${card.name}" added.`);
          addRequest.onerror = (errEvent) => console.error(`Error adding card "${card.name}":`, errEvent.target.error);
        });
      }
    };

    // Triggered when opening the database fails
    request.onerror = (event) => {
      console.error(`Database error: ${event.target.errorCode}`);
      reject(event.target.errorCode);
    };
  });
}

// Call this function on app startup to initialize the database
// For example, in a main JS file or after DOMContentLoaded
// window.addEventListener('DOMContentLoaded', () => {
//   initDB().then(database => {
//     console.log('DB initialized!', database);
//     // Now you can use the db object for other operations
//   }).catch(error => {
//     console.error('Failed to initialize DB:', error);
//   });
// });

// Comment out auto-call for now; will call it at the appropriate place

initDB(); 


/**
 * Get all card data from the 'cards' object store in IndexedDB
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of all card objects
 */
function getAllCards() {
  return new Promise((resolve, reject) => {
    // Ensure the database is initialized and available
    if (!db) {
      console.error('Database not initialized. Call initDB() first.');
      // Optionally, you could try to auto-call initDB() here, but be careful with async flow
      // initDB().then(() => getAllCards().then(resolve).catch(reject)).catch(reject);
      reject('Database not initialized.');
      return;
    }

    // 1. Start a readonly transaction for the 'cards' object store
    const transaction = db.transaction([STORE_NAME], 'readonly');
    
    // 2. Get a reference to the 'cards' object store from the transaction
    const objectStore = transaction.objectStore(STORE_NAME);

    // 3. Use getAll() to fetch all records from the object store
    const request = objectStore.getAll();

    // 4. Handle the request result (async)
    request.onsuccess = (event) => {
      // event.target.result is the array of all card objects
      console.log('Successfully retrieved all cards:', event.target.result);
      resolve(event.target.result); // Promise resolves with the card array
    };

    request.onerror = (event) => {
      console.error('Error retrieving all cards:', event.target.error);
      reject(event.target.error); // Promise rejects with error info
    };

    // (Optional) Listen for transaction complete event, useful for debugging or ensuring all operations are committed
    transaction.oncomplete = () => {
      console.log('Transaction "getAllCards" completed.');
    };

    transaction.onerror = (event) => {
      console.error('Transaction error in "getAllCards":', event.target.error);
      // If the transaction itself fails, also reject the Promise
      // If request.onerror didn't catch it, this is the last line of defense
      if (!request.error) { // Avoid duplicate rejects
          reject(event.target.error);
      }
    };
  });
}


/**
 * Get a single card by ID from the 'cards' object store in IndexedDB
 * @param {string} cardId The ID of the card to fetch
 * @returns {Promise<Object|undefined>} A Promise that resolves to the card object, or undefined if not found
 */
function getCardById(cardId) {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('Database not initialized for getCardById. Call initDB() first.');
      reject('Database not initialized.');
      return;
    }

    // 1. Start a readonly transaction
    const transaction = db.transaction([STORE_NAME], 'readonly');
    // 2. Get object store reference
    const objectStore = transaction.objectStore(STORE_NAME);

    // 3. Use get() to fetch a single record by primary key (keyPath, our 'id')
    const request = objectStore.get(cardId);

    // 4. Handle the request result
    request.onsuccess = (event) => {
      // event.target.result is the found card object, or undefined if not found
      const card = event.target.result;
      if (card) {
        console.log(`Successfully retrieved card with ID "${cardId}":`, card);
      } else {
        console.log(`Card with ID "${cardId}" not found.`);
      }
      resolve(card); // Always resolve, caller decides what to do with result
    };

    request.onerror = (event) => {
      console.error(`Error retrieving card with ID "${cardId}":`, event.target.error);
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      console.log(`Transaction "getCardById" for ID "${cardId}" completed.`);
    };

    transaction.onerror = (event) => {
      console.error(`Transaction error in "getCardById" for ID "${cardId}":`, event.target.error);
      if (!request.error) {
          reject(event.target.error);
      }
    };
  });
}

// After ensuring initDB() is complete, try in the console:

// 1. Call initDB and wait for it to finish
initDB().then(() => {
  console.log('DB is ready for reading tests!');

  // Test getAllCards()
  getAllCards()
    .then(allCards => {
      console.log('--- All Cards ---');
      console.table(allCards); // console.table() displays object arrays nicely
    })
    .catch(error => {
      console.error('Error in getAllCards test:', error);
    });

  // Test getCardById() - assuming you have a card with id 'structure001'
  getCardById('structure001')
    .then(card => {
      console.log('--- Card by ID (structure001) ---');
      if (card) {
        console.log(card);
      } else {
        console.log('Card not found!');
      }
    })
    .catch(error => {
      console.error('Error in getCardById test (structure001):', error);
    });

  // Test fetching a non-existent card ID
  getCardById('nonexistent000')
    .then(card => {
      console.log('--- Card by ID (nonexistent000) ---');
      if (card) {
        console.log(card);
      } else {
        console.log('Card (nonexistent000) not found, as expected.');
      }
    })
    .catch(error => {
      console.error('Error in getCardById test (nonexistent000):', error);
    });

}).catch(error => {
  console.error('DB initialization failed, cannot run read tests:', error);
});

