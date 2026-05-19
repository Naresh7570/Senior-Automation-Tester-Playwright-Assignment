import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginScenarios, testData } from '../../utils/testData';
import { compareImages } from '../../utils/imgCompare'
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';


test.describe('Login Scenarios - SauceDemo Users', () => {

  for (const scenario of loginScenarios) {

    test(`${scenario.name}`, async ({ page }) => {

      const loginPage = new LoginPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      // 1️⃣ Navigate
      await loginPage.goto();

      // 2️⃣ Perform login
      await loginPage.login(
        scenario.username,
        scenario.password
      );

      // 3️⃣ Optional behavior handling
    if (scenario.behavior === 'slow') {

  await expect(
    page.locator('[data-test="title"]')
  ).toHaveText('Products');
}

      // 4️⃣ Validation logic
      switch (scenario.expected) {

        case 'success':

          await loginPage.verifyLoginSuccess();
          break;

        case 'locked':

          await loginPage.verifyErrorContains(
            'Sorry, this user has been locked out.'
          );
          break;

        case 'failure':
          await loginPage.verifyVisualLayout();
          await cartPage.verifyProduct(testData.productName);
           await cartPage.clickCheckout();
         
           // 5️⃣ Checkout details (from env)
           await  checkoutPage.enterUserDetails(
             process.env.FIRST_NAME!,
             process.env.LAST_NAME!,
             process.env.POSTAL_CODE!
           );
          break;


        default:

          throw new Error(
            `Unknown expected type: ${scenario.expected}`
          );
      }

      // 5️⃣ Visual validation
// // Standard User -> capture baseline
if (scenario.name === 'Standard User') {

  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: 'tests/UI/baseline/baseline.png',
    fullPage: true
  });
}


// Visual User -> compare
if (scenario.name === 'Visual User') {

  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: 'tests/UI/baseline/visual_check.png',
    fullPage: true
  });

  const mismatchedPixels = compareImages(
    'tests/UI/baseline/baseline.png',
    'tests/UI/ACTUAL/visual_check.png',
    'tests/UI/ACTUAL/diff.png'
  );
  if (mismatchedPixels > 0) {

  throw new Error(
    `Visual User UI mismatch detected.
     Different pixels found: ${mismatchedPixels}
     Check diff.png for differences`
  );
}

}
    });

  }
  }
);
