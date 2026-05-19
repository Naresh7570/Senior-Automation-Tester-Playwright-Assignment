import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  // Step 1: Enter user details
  async enterUserDetails(
  first: string,
  last: string,
  zip: string
) {

  // ============================================
  // First Name
  // ============================================

  await this.page.fill('#first-name', first);

  const firstValue = await this.page
    .locator('#first-name')
    .inputValue();

  if (firstValue !== first) {

    throw new Error(
      `First Name input failed.
       Expected: ${first}
       Actual: ${firstValue}`
    );
  }

  // ============================================
  // Last Name
  // ============================================

  await this.page.fill('#last-name', last);

  const lastValue = await this.page
    .locator('#last-name')
    .inputValue();

  if (lastValue !== last) {

    throw new Error(
      `Last Name input failed.
       Expected: ${last}
       Actual: ${lastValue}`
    );
  }

  // ============================================
  // Postal Code
  // ============================================

  await this.page.fill('#postal-code', zip);

  const zipValue = await this.page
    .locator('#postal-code')
    .inputValue();

  if (zipValue !== zip) {

    throw new Error(
      `Postal Code input failed.
       Expected: ${zip}
       Actual: ${zipValue}`
    );
  }
}
  async clickContinue() {
    await this.page.click('#continue');
  }

  // Step 2: Verify overview page
  async verifyOverviewPage() {
    await expect(this.page.locator('.title'))
      .toHaveText('Checkout: Overview');
  }

  async verifyPaymentInfo() {
    await expect(this.page.locator('.summary_value_label').first())
      .toBeVisible();
  }

  async verifyShippingInfo() {
    await expect(this.page.locator('.summary_value_label').nth(1))
      .toBeVisible();
  }

  async verifyTotal() {
    await expect(this.page.locator('.summary_total_label'))
      .toBeVisible();
  }

  // Step 3: Finish order
  async clickFinish() {
    await this.page.click('#finish');
  }

  // Step 4: Confirmation
  async verifyThankYou() {
    await expect(this.page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  }

  async clickBackHome() {
    await this.page.click('#back-to-products');
  }
}