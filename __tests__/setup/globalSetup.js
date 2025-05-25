import { setup as setupDevServer } from "jest-dev-server";
import setupPuppeteer from "jest-environment-puppeteer/setup";

export default async function globalSetup(config) {
  await setupDevServer({
    command: "http-server ./src/pages -p 8080",
    launchTimeout: 30000,
    port: 8080,
    reuseExistingServer: true,
  });

  await setupPuppeteer(config);
}
