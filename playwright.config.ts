import {defineConfig, devices} from '@playwright/test';
import {testConfig} from "./testConfig";
import {TestOptions} from "@lib/baseTest";

enum Environment {
  qa = 'qa',
  dev = 'dev',
  stage = 'stage',
}

// @ts-ignore
const ENV: Environment = process.env.ENV ? process.env.ENV : process.env.npm_config_ENV;

if (!ENV || ![`qa`, `dev`, `stage`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|stage"`);
  process.exit();
}

export default defineConfig<TestOptions>({
  testDir: './tests',

  timeout: 60000,
  expect: { timeout: 20000 },

  // Global Setup to run before all tests
  globalSetup: `./global-setup`,

  // Global Teardown to run after all tests
  // globalTeardown: `./global-teardown`,

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : 3,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: process.env.CI ? 'blob' : 'html',
  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: testConfig[ENV],
    launchOptions: {
      // 1
      // args: ["--start-maximized"],
    },
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'default',
      use: { profile: 'profile-00' },
    },
    {
      name: 'user-01',
      use: { profile: 'profile-01' },
    },
    {
      name: 'user-02',
      use: { profile: 'profile-02' },
    },
    {
      name: 'user-03',
      use: { profile: 'profile-03' },
    },
    {
      name: 'user-04',
      use: { profile: 'profile-04' },
    },
    {
      name: 'user-05',
      use: { profile: 'profile-05' },
    },
    {
      name: 'user-06',
      use: { profile: 'profile-06' },
    },
    {
      name: 'user-07',
      use: { profile: 'profile-07' },
    },
    {
      name: 'user-08',
      use: { profile: 'profile-08' },
    },
    {
      name: 'user-09',
      use: { profile: 'profile-09' },
    },
    {
      name: 'user-10',
      use: { profile: 'profile-10' },
    },
    {
      name: 'user-11',
      use: { profile: 'profile-11' },
    },
    {
      name: 'user-12',
      use: { profile: 'profile-12' },
    },
    {
      name: 'user-13',
      use: { profile: 'profile-13' },
    },
    {
      name: 'user-14',
      use: { profile: 'profile-14' },
    },
    {
      name: 'user-15',
      use: { profile: 'profile-15' },
    },
  ],

});

