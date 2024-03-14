import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

export class MetaMaskSpendingCapPage extends BasePage {
  SPENDING_CAP_INPUT: Locator;
  REJECT_BUTTON: Locator;
  NEXT_BUTTON: Locator;
  APPROVE_BUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.SPENDING_CAP_INPUT = page.locator('input[data-testid=custom-spending-cap-input]');
    this.REJECT_BUTTON = page.locator('button.page-container__footer-button').and(page.getByText('Reject'));
    this.NEXT_BUTTON = page.locator('button.page-container__footer-button').and(page.getByText('Next'));
    this.APPROVE_BUTTON = page.locator('button.page-container__footer-button').and(page.getByText('Approve'));
  }

  async navigateSelf() {
    await this.page().bringToFront();
  }

}
