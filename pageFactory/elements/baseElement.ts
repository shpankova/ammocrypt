import {Locator} from "@playwright/test";

export class BaseElement {
  private readonly locator: Locator;
  constructor(locator: Locator) {
    this.locator = locator;
  }
  root(){
    return this.locator;
  }
}
