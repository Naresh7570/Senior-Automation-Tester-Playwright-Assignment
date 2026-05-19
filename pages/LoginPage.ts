import { Page, Locator, expect } from '@playwright/test';

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

    await this.page.goto('/');
  }

  async login(username: string, password: string) {

    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async verifyLoginSuccess() {

    await expect(this.page)
      .toHaveURL(/inventory/);
  }

  async verifyErrorContains(text: string) {

    await expect(this.errorMessage)
      .toContainText(text);
  }

  async verifyVisualLayout() {

    // wait until UI becomes stable
    await this.page.waitForLoadState(
      'networkidle'
    );

    // visual comparison
    await expect(
      this.page.locator('.inventory_list')
    ).toHaveScreenshot(
      'inventory-baseline.png'
    );
  }

  
    async verifyProblemUserImages() {

    await expect(this.page).toHaveURL(/inventory/);

    const images = await this.page
      .locator('.inventory_item_img img')
      .evaluateAll(imgs =>
        imgs.map(img =>
          img.getAttribute('src')
        )
      );

    console.log('Product Images:', images);

    const uniqueImages = [...new Set(images)];

    console.log('Unique Images:', uniqueImages);

    // FAIL if all images are same
    await expect(uniqueImages.length)
      .toBeGreaterThan(1);
  }

}