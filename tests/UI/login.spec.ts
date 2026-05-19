import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { loginScenarios, testData } from "../../utils/testData";
import { compareImages } from "../../utils/imgCompare";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Login Scenarios - SauceDemo Users", () => {
  // Reusable checkout flow
  async function performCheckoutFlow(
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutPage: CheckoutPage,
  ) {
    await inventoryPage.addToCart(testData.productName);

    await inventoryPage.openCart();

    await cartPage.verifyProduct(testData.productName);

    await cartPage.clickCheckout();

    await checkoutPage.enterUserDetails(
      process.env.FIRST_NAME!,
      process.env.LAST_NAME!,
      process.env.POSTAL_CODE!,
    );
  }

  // Complete order flow
  async function completeOrderFlow(checkoutPage: CheckoutPage) {
    await checkoutPage.verifyOverviewPage();

    await checkoutPage.verifyPaymentInfo();

    await checkoutPage.verifyShippingInfo();

    await checkoutPage.verifyTotal();

    await checkoutPage.clickFinish();

    await checkoutPage.verifyThankYou();

    await checkoutPage.clickBackHome();
  }

  for (const scenario of loginScenarios) {
    test(`${scenario.name}`, async ({ page }, testInfo) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      // Navigate
      await loginPage.goto();

      // Login
      await loginPage.login(scenario.username, scenario.password);

      // Slow user handling
      if (scenario.behavior === "slow") {
        await page.waitForLoadState("networkidle");

        await expect(page.locator('[data-test="title"]')).toHaveText(
          "Products",
        );
      }

      // Validation logic
      switch (scenario.expected) {
        case "success":
          await loginPage.verifyLoginSuccess();
          break;

        case "locked":
          await loginPage.verifyErrorContains(
            "Sorry, this user has been locked out.",
          );
          break;

        case "failure":
          await loginPage.verifyProblemUserImages();

          await performCheckoutFlow(inventoryPage, cartPage, checkoutPage);

          break;

        case "error":
          await performCheckoutFlow(inventoryPage, cartPage, checkoutPage);

          await completeOrderFlow(checkoutPage);

          break;

        default:
          throw new Error(`Unknown expected type: ${scenario.expected}`);
      }

      // Standard User -> capture baseline
      if (scenario.name === "Standard User") {
        await page.waitForLoadState("networkidle");

        // Baseline capture
        await page.screenshot({
          path: "snapshots/baseline/baseline.png",
          fullPage: true,
        });
      }

      // Visual User -> compare
      if (scenario.name === "Visual User") {
        await page.waitForLoadState("networkidle");
        // Visual capture
        await page.screenshot({
          path: "snapshots/actual/visual_check.png",
          fullPage: true,
        });

        const mismatchedPixels = compareImages(
          "snapshots/baseline/baseline.png",
          "snapshots/actual/visual_check.png",
          "snapshots/actual/diff.png",
        );

        if (mismatchedPixels > 0) {
          // Attach diff image to Playwright report
          await testInfo.attach("Visual Diff", {
            path: "snapshots/actual/diff.png",
            contentType: "image/png",
          });

          throw new Error(
            `Visual User UI mismatch detected. Different pixels found: ${mismatchedPixels}`,
          );
        }
      }
    });
  }
});
