import { Page } from "@playwright/test";

export class BasePage {
  private readonly root: Page;

  constructor(page: Page) {
    this.root = page;
  }

  page(){
    return this.root;
  }

  getPageByTitle(title: string) {
    const pages = this.page().context().pages();
    return pages.find(async p => {
      (await p.title()).startsWith(title)
    });
  }

  getPageByIndex(idx: number) {
    return this.page().context().pages()[idx];
  }

}
