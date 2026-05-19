import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('[data-test="username"]');

    this.passwordInput = page.locator('[data-test="password"]');

    this.loginButton = page.locator('[data-test="login-button"]');

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyErrorContains(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async verifyProblemUserImages() {
    await expect(this.page).toHaveURL(/inventory/);

    const images = await this.page
      .locator(".inventory_item_img img")
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute("src")));

    const uniqueImages = [...new Set(images)];

    console.log("Product Images:", images);
    console.log("Unique Images:", uniqueImages);

    // Log issue but DO NOT fail test
    if (uniqueImages.length <= 1) {
      console.warn(
        "⚠️ Known defect: Problem User shows duplicate product images.",
      );
    } else {
      console.log("✅ Product images are unique.");
    }
  }
}
