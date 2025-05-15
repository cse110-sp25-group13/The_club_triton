import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Needed to resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = `file://${path.resolve(__dirname, '../explore.html')}`;

const options = new chrome.Options();
options.addArguments('--headless');

const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

try {
  await driver.get(filePath);
  const heading = await driver.findElement(By.css('h2')).getText();
  console.log('Found heading:', heading);
} catch (err) {
  console.error('Test failed:', err);
} finally {
  await driver.quit();
}
