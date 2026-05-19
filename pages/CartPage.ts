import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProduct(productName: string) {
    await expect(this.page.locator('.cart_item'))
      .toContainText(productName);
  }

  async clickCheckout() {
    await this.page.click('#checkout');
  }
}