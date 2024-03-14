import { BaseElement } from "./baseElement";
import {Locator} from "@playwright/test";

export class TokenInput extends BaseElement {
  TOKEN_AMOUNT: Locator;
  TOKEN_SELECTOR: Locator;
  TOKEN_SELECTOR_OPTION: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.TOKEN_AMOUNT = this.root().locator('input[class*=input]');
    this.TOKEN_SELECTOR = this.root().locator('div#token');
    this.TOKEN_SELECTOR_OPTION = this.root().page().locator('ul[role=listbox]');  //li[data-value=USDT]
  }

  async setAmount(amount: any){
    await this.TOKEN_AMOUNT.fill(amount);
  }

  async selectToken(token: string){
    await this.TOKEN_SELECTOR.click();
    await this.TOKEN_SELECTOR_OPTION.getByText(token).click();
  }

}
