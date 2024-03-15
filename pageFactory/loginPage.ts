import {expect, Page} from "@playwright/test";
import { MetaMaskConnectWalletPage } from "@pages/metaMaskConnectWalletPage";
import { BasePage } from "@pages/basePage";

const randomDelay = (delay: number) => new Promise(resolve => setTimeout(resolve, Math.random() * delay));

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(delay:number = 15000) {
    const page = this.page();

    await randomDelay(delay);
    await page.goto('/');
  }

  async connectWallet() {
    const page = this.page();
    const context = this.page().context();

    let newPage = await context.waitForEvent('page');
    console.log(await newPage.title());
    //comment line below in production mode
    //await page.pause();

    const metaMaskConnectWalletPage = new MetaMaskConnectWalletPage(newPage);
    await metaMaskConnectWalletPage.PASSWORD_INPUT.fill('SR27943px');
    await metaMaskConnectWalletPage.UNLOCK_BUTTON.click();
    //comment line below in production mode
    // await page.pause();

    await page.getByRole('button', { name: 'Connect wallet' }).click();
    if (await page.getByRole('button', { name: 'MetaMask' }).isVisible()) {
      await page.getByRole('button', { name: 'Metamask' }).click();
    }
    //comment line below in production mode
    // await page.pause();

    newPage = await context.waitForEvent('page');
    const walletAddress = await newPage.locator('div.request-signature__row-value').innerText();
    console.log(await newPage.title() + ' - ' + walletAddress.match(/address:\s(.*)/)[1]);
    await newPage.getByRole('button', { name: 'Sign' }).click();
    await expect(this.page()).toHaveURL(/.*balance/, {timeout: 5000});
    //comment line below in production mode
    // await page.pause();

  }
}
