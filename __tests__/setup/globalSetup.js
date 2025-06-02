import { spawn } from "child_process";
import { writeFileSync } from "fs";
import waitOn from "wait-on";
import setupPuppeteer from "jest-environment-puppeteer/setup";

export default async function globalSetup(globalConfig) {
  const port = 8080;
  const server = spawn("npx", ["http-server", ".", "-p", port], {
    detached: true,
    stdio: "ignore",
    shell: true,
  });

  writeFileSync(".http-server-pid", String(server.pid));

  console.log(`\nHTTP server running on port:${port}, PID:${server.pid}`);

  await waitOn({
    resources: ["http://localhost:8080/src/pages/game-lobby.html"],
  });

  await setupPuppeteer(globalConfig);
}
