import { test as base, chromium } from '@playwright/test';
import { join } from 'path';
import { PurchasePage } from "@pages/purchasePage";
import { HistoryPage } from "@pages/historyPage";
import { MetaMaskConnectWalletPage } from "@pages/metaMaskConnectWalletPage";

export interface TestOptions { profile: string }

const test = base.extend<TestOptions & {
  purchasePage: PurchasePage;
  historyPage: HistoryPage;
  metaMaskConnectWalletPage: MetaMaskConnectWalletPage;
}>({
  profile: ['profile-00', { option: true }],
  context: async ({ profile}, use) => {
    const pathToExtension = join(__dirname, 'my-extension');
    const pathToProfile = join(__dirname, '..', 'tests-profiles', profile);
    console.log('Starting chromium with profile ' + pathToProfile);
    const context = await chromium.launchPersistentContext(pathToProfile, {
    headless: false,
      args: [
        '--disable-extensions-except=' + pathToExtension,
        '--load-extension=' + pathToExtension,
      ],
    });
    console.log(profile);
    await use(context);
  },
  purchasePage: async ({ page }, use) => {
    await use(new PurchasePage(page));
  },
  historyPage: async ({ page }, use) => {
    await use(new HistoryPage(page));
  },
  metaMaskConnectWalletPage: async ({ page }, use) => {
    await use(new MetaMaskConnectWalletPage(page));
  },
});

export default test;
