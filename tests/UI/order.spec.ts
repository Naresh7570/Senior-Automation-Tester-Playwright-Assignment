import { test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { testData } from '../../utils/testData';

test('E2E Order Flow - Add to Cart → Checkout → Finish', async ({ page }) => {

  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // 1️⃣ Login (from env)
  await page.goto(process.env.BASE_URL!);

  await page.fill('#user-name', process.env.STANDARD_USER!);
  await page.fill('#password', process.env.PASSWORD!);
  await page.click('#login-button');

  // 2️⃣ Add product (from testData)
  await inventory.addToCart(testData.productName);

  // 3️⃣ Open cart
  await inventory.openCart();

  // 4️⃣ Verify cart
  await cart.verifyProduct(testData.productName);
  await cart.clickCheckout();

  // 5️⃣ Checkout details (from env)
  await checkout.enterUserDetails(
    process.env.FIRST_NAME!,
    process.env.LAST_NAME!,
    process.env.POSTAL_CODE!
  );

  await checkout.clickContinue();

  // 6️⃣ Overview validations
  await checkout.verifyOverviewPage();
  await checkout.verifyPaymentInfo();
  await checkout.verifyShippingInfo();
  await checkout.verifyTotal();

  // 7️⃣ Finish order
  await checkout.clickFinish();

  // 8️⃣ Thank you page
  await checkout.verifyThankYou();

  // 9️⃣ Back home
  await checkout.clickBackHome();
});