import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";
import {TokenInput} from "./elements/tokenInput";

export class PurchasePage extends BasePage {
  CURRENCY_RATE: Locator;
  PAYMENT_TOKEN: TokenInput;
  PURCHASED_TOKEN: TokenInput;
  AUTHORISE_BUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.CURRENCY_RATE = page.locator('p[class*=currencyRate]');
    this.PAYMENT_TOKEN = new TokenInput(page.locator('form div[class*=content]:nth-of-type(1)'));
    this.PURCHASED_TOKEN = new TokenInput(page.locator('form div[class*=content]:nth-of-type(2)'));
    this.AUTHORISE_BUTTON = page.locator('form button[type=submit]');
  }

  async navigateSelf() {
    if (!await this.page().locator('a[href="/purchase"]').isVisible()) {
      await this.page().locator('svg[data-testid=DensityMediumIcon]').click();
    }
    await this.page().locator('a[href="/purchase"]:visible').click();
  }
}
