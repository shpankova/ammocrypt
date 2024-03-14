import {Locator, Page} from "@playwright/test";
import { BasePage } from "./basePage";

export class MetaMaskConnectWalletPage extends BasePage {
  PASSWORD_INPUT: Locator;
  UNLOCK_BUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.PASSWORD_INPUT = page.locator('input[data-testid=unlock-password]');
    this.UNLOCK_BUTTON = page.locator('button[data-testid=unlock-submit]');
  }

  async navigateSelf() {
    await this.page().bringToFront();
  }
}
