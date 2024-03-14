import {expect, Page} from "@playwright/test";
import {BasePage} from "./basePage";
import {MuiTable} from "./elements/muiTable";

export class HistoryPage extends BasePage {
  HISTORY_TABLE: MuiTable;

  constructor(page: Page) {
    super(page);
    this.HISTORY_TABLE = new MuiTable(page.locator('table.MuiTable-root '));
  }

  async navigateSelf() {
    if (!await this.page().locator('a[href="/history"]').isVisible()) {
      await this.page().locator('svg[data-testid=DensityMediumIcon]').click();
    }
    await this.page().locator('a[href="/history"]:visible').click();
  }
}
