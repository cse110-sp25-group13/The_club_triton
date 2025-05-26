export default {
  rootDir: "..",
  preset: "jest-puppeteer",
  testMatch: ["<rootDir>/__tests__/e2e/**/*.test.js"],
  verbose: true,
  globalSetup: "<rootDir>/__tests__/setup/globalSetup.js",
  globalTeardown: "<rootDir>/__tests__/setup/globalTeardown.js",
  maxWorkers: 1,
};
