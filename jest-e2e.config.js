export default {
  preset: "jest-puppeteer",
  testMatch: ["**/__tests__/e2e/**/*.test.js"],
  verbose: true,
  testEnvironment: "node",
  maxWorkers: 1,
};
