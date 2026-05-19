import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  // ============================================
  // Reusable Input Validation Helper
  // ============================================
  private async tryFillInput(
    selector: string,
    value: string,
    fieldName: string,
  ) {
    try {
      await this.page.fill(selector, value);

      await expect(this.page.locator(selector)).toHaveValue(value);

      console.log(`✅ ${fieldName} entered successfully`);
    } catch {
      console.warn(
        `⚠️ Could not enter ${fieldName}.
Possible Problem User UI defect.`,
      );
    }
  }

  // ============================================
  // Step 1: Enter Checkout Details
  // ============================================

  async enterUserDetails(first: string, last: string, zip: string) {
    // Try all fields independently
    await this.tryFillInput("#first-name", first, "First Name");
    await this.tryFillInput("#last-name", last, "Last Name");
    await this.tryFillInput("#postal-code", zip, "Postal Code");

    // Try continue
    await this.clickContinue();

    // Catch UI validation message if shown
    await this.captureValidationError();
  }

  async captureValidationError() {
    const errorBanner = this.page.locator('[data-test="error"]');

    if (await errorBanner.isVisible()) {
      const errorText = await errorBanner.textContent();

      console.warn(
        `⚠️ Checkout validation error shown:
${errorText}`,
      );
    } else {
      console.log("✅ No checkout validation errors");
    }
  }
  // ============================================
  // Continue Checkout
  // ============================================

  async clickContinue() {
    await this.page.click("#continue");
  }

  // ============================================
  // Checkout Overview Validation
  // ============================================

  async verifyOverviewPage() {
    await expect(this.page.locator(".title")).toHaveText("Checkout: Overview");
  }

  // ============================================
  // Payment Validation
  // ============================================

  async verifyPaymentInfo() {
    await expect(
      this.page.locator(".summary_value_label").first(),
    ).toBeVisible();
  }

  // ============================================
  // Shipping Validation
  // ============================================

  async verifyShippingInfo() {
    await expect(
      this.page.locator(".summary_value_label").nth(1),
    ).toBeVisible();
  }

  // ============================================
  // Total Validation
  // ============================================

  async verifyTotal() {
    await expect(this.page.locator(".summary_total_label")).toBeVisible();
  }

  // ============================================
  // Finish Order
  // ============================================

  async clickFinish() {
    await this.page.click("#finish");

    try {
      await expect(this.page).toHaveURL(/checkout-complete/, {
        timeout: 5000,
      });

      console.log("✅ Order completed successfully");
    } catch {
      console.log("⚠️ Error User could not complete checkout");
    }
  }

  // ============================================
  // Order Confirmation
  // ============================================

  async verifyThankYou() {
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!",
    );
  }

  // ============================================
  // Back Home
  // ============================================

  async clickBackHome() {
    await this.page.click("#back-to-products");
  }

  // ============================================
  // Problem User Image Validation
  // ============================================

  async verifyProblemUserImages() {
    await expect(this.page).toHaveURL(/inventory/);

    const images = await this.page
      .locator(".inventory_item_img img")
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")));

    console.log("Problem User Product Images:", images);

    const uniqueImages = [...new Set(images)];

    console.log("Unique Images:", uniqueImages);

    // FAIL if all images are same
    expect(uniqueImages.length).toBeGreaterThan(1);
  }

  // ============================================
  // Visual Regression Validation
  // ============================================

  async verifyVisualLayout() {
    // wait until UI stable
    await this.page.waitForLoadState("networkidle");

    // compare inventory UI
    await expect(this.page.locator(".inventory_list")).toHaveScreenshot(
      "inventory-baseline.png",
    );
  }
}
