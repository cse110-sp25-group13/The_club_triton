import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "../__tests__/browser",
  use: {
    headless: true,
    baseURL: "https://cse110-sp25-group13.github.io/The_club_triton/src/pages/",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    /*{
      name: 'webkit',
      use: { browserName: 'webkit' },
    },*/
  ],
  reporter: [["html", { outputFolder: "playwright-report" }]],
});
