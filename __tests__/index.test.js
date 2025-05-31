import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("index.html is not empty", async () => {
  const filePath = path.join(__dirname, "../src/pages/index.html");
  const content = (await readFile(filePath, "utf-8")).trim();
  expect(content.length).toBeGreaterThan(0);
});
