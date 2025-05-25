export default {
  preset: "jest-puppeteer",
  testMatch: ["**/__tests__/e2e/**/*.test.js"],
  verbose: true,
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  maxWorkers: 1,
};
