import teardownPuppeteer from 'jest-environment-puppeteer/teardown';
import killPort from 'kill-port';

export default async function globalTeardown(globalConfig) {
  await teardownPuppeteer(globalConfig);

  await killPort(8080);
}
