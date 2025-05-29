import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { dummy, localStorageDummy } from "../../src/scripts/script.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("index.html is not empty", async () => {
  const filePath = path.join(__dirname, "../../src/pages/index.html");
  const content = (await readFile(filePath, "utf-8")).trim();
  expect(content.length).toBeGreaterThan(0);
});

test("dummy function returns true", () => {
  expect(dummy()).toBe(true);
});

test("dummy function sets and reads localStorage", () => {
  expect(localStorageDummy()).toBe(true);
  expect(localStorage.getItem("isDummy")).toBe("true");
});

test("localStorage mock behaves like real localStorage", () => {
  localStorage.setItem("key", "value");
  expect(localStorage.getItem("key")).toBe("value");

  localStorage.removeItem("key");
  expect(localStorage.getItem("key")).toBe(null);

  localStorage.setItem("a", "1");
  localStorage.setItem("b", "2");
  localStorage.clear();
  expect(localStorage.getItem("a")).toBe(null);
  expect(localStorage.getItem("b")).toBe(null);
});
