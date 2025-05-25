export default {
  testMatch: ["**/__tests__/unit/**/*.test.js"],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  testEnvironment: "jsdom",
};
