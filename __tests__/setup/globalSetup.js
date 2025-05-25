import { spawn } from "child_process";
import { writeFileSync } from "fs";
import waitOn from "wait-on";
import setupPuppeteer from "jest-environment-puppeteer/setup";

export default async function globalSetup(globalConfig) {
  const server = spawn("npx", ["http-server", "./src/pages", "-p", "8080"], {
    detached: true,
    stdio: "ignore",
    shell: true,
  });

  writeFileSync(".http-server-pid", String(server.pid));

  await waitOn({ resources: ["http://localhost:8080/game-lobby.html"] });

  await setupPuppeteer(globalConfig);
}
