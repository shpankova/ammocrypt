import { BaseElement } from "./baseElement";
import {Locator} from "@playwright/test";

export class MuiTable extends BaseElement {
  HEADERS: Locator;
  private readonly rowByIndexTemplate: (index: any) => string;
  private readonly colByIndexTemplate: (index: any) => string;

  constructor(locator: Locator) {
    super(locator);
    this.HEADERS = this.root().locator('.//thead/tr/th');
    this.rowByIndexTemplate = (index: any) => `.//tbody/tr[${index}]/th`;
    this.colByIndexTemplate = (index: any) => `.//tbody/tr/th[${index}]`;
  }

  async getColumnNames() {
    return await this.HEADERS.allTextContents();
  }

  async getRowCells(rowIndex: number){
    const lc = this.rowByIndexTemplate(rowIndex);
    return this.root().locator(lc);
  }

  async getRowValues(rowIndex: number){
    return (await this.getRowCells(rowIndex)).allTextContents();
  }

  async getColumnCells(colIndex: number){
    const lc = this.colByIndexTemplate(colIndex);
    return this.root().locator(lc);
  }

  async getColumnValues(colIndex: number){
    return (await this.getColumnCells(colIndex)).allTextContents();
  }

}
