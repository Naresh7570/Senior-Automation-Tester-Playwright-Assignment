import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {
    await this.page.locator(`text=${productName}`).first().waitFor();

    await this.page
      .locator(`.inventory_item`)
      .filter({ hasText: productName })
      .locator("button")
      .click();
  }

  async openCart() {
    await this.page.click(".shopping_cart_link");
  }
}
