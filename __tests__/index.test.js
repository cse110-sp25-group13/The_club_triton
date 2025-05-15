const fs = require('fs');
const path = require('path');

test('index.html is not empty', () => {
  const filePath = path.join(__dirname, '../src/pages/index.html');
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  expect(content.length).toBeGreaterThan(0);
});
