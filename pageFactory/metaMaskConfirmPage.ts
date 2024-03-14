import {Locator, Page} from "@playwright/test";
import {BasePage} from "./basePage";

export class MetaMaskConfirmPage extends BasePage {
  REJECT_BUTTON: Locator;
  CONFIRM_BUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.REJECT_BUTTON = page.locator('button[data-testid=page-container-footer-cancel]');
    this.CONFIRM_BUTTON = page.locator('button[data-testid=page-container-footer-next]').and(page.getByText('Confirm'));
  }

  async navigateSelf() {
    // const pages = this.page.context().pages();
    // for (let pg of pages) {
    //   if ('MetaMask' === await pg.title()){
    //     return pg;
    //   }
    // }
    await this.page().bringToFront();
  }
}
