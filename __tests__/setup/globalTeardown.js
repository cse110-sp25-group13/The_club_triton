import { teardown as teardownDevServer } from "jest-dev-server";
import teardownPuppeteer from "jest-environment-puppeteer/teardown";
import killPort from "kill-port";

export default async function globalTeardown(globalConfig) {
  await teardownPuppeteer(globalConfig);

  try {
    await teardownDevServer({ port: 8080 });
  } catch (err) {
    console.error(err);
  }

  await killPort(8080);
}
