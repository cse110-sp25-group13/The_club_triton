import teardownPuppeteer from "jest-environment-puppeteer/teardown";
import { readFileSync, unlinkSync } from "fs";
import killPort from "kill-port";

export default async function globalTeardown(globalConfig) {
  await teardownPuppeteer(globalConfig);

  try {
    const pid = parseInt(readFileSync(".http-server-pid", "utf-8"), 10);
    process.kill(pid);
    unlinkSync(".http-server-pid");
  } catch (e) {
    /* ignore if it’s gone */
  }

  try {
    await killPort(8080);
  } catch (err) {
    console.warn("kill-port:", err.message);
  }
}
