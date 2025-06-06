// setup.js

//Polyfill structuredClone if it doesn't exist
if (typeof structuredClone === "undefined") {
  // a simple deep-clone via JSON (OK for plain data)
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import "fake-indexeddb/auto";      // shim IndexedDB


import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// compute __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// point this at where your cards.json lives
const JSON_DIR = path.resolve(__dirname, "src", "card");

//Override fetch to load JSON from disk
global.fetch = async (url) => {
  const fileName = path.basename(url);
  const fullPath = path.join(JSON_DIR, fileName);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Mock fetch: no such file ${fullPath}`);
  }
  const text = fs.readFileSync(fullPath, "utf-8");
  return {
    ok: true,
    json: async () => JSON.parse(text),
  };
};
