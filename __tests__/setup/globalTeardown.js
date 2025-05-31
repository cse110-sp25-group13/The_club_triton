import teardownPuppeteer from "jest-environment-puppeteer/teardown";
import { readFileSync, unlinkSync } from "fs";
import killPort from "kill-port";

export default async function globalTeardown(globalConfig) {
  const port = 8080;

  await teardownPuppeteer(globalConfig);

  try {
    const pid = parseInt(readFileSync(".http-server-pid", "utf-8"), 10);
    console.log(
      `\nTrying to kill HTTP server running on port:${port}, PID:${pid}`,
    );
    process.kill(pid);
    unlinkSync(".http-server-pid");
  } catch (err) {
    console.warn("process:", err.message);
  }

  try {
    await killPort(port);
  } catch (err) {
    console.warn("kill-port:", err.message);
  }
}
