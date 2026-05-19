# 🚀 Ejada Automation Framework

A scalable and maintainable **Playwright + TypeScript** automation framework for **UI and API testing**, designed using modern enterprise automation best practices.

This framework includes:

- ✅ UI Automation Testing
- ✅ API Testing
- ✅ Cross-Browser Testing (Chromium & Firefox)
- ✅ Parallel Test Execution
- ✅ Page Object Model (POM)
- ✅ Data-Driven Testing
- ✅ Visual Regression Testing
- ✅ Environment Variable Management
- ✅ Playwright HTML Reports
- ✅ Allure Reporting
- ✅ GitHub Actions CI Integration

---

# 📂 Project Structure

```bash
ejada-automation-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── API/
│   │   └── books-api.spec.ts
│   │
│   └── UI/
│       ├── ACTUAL/
│       │   ├── diff.png
│       │   └── visual_check.png
│       │
│       ├── baseline/
│       │   └── baseline.png
│       │
│       ├── login.spec.ts
│       └── order.spec.ts
│
├── utils/
│   ├── imgCompare.ts
│   └── testData.ts
│
├── allure-report/
├── allure-results/
├── playwright-report/
├── test-results/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

# ⚙️ Prerequisites

Install:

- **Node.js (v18 or higher)**
- **npm**

Verify installation:

```bash
node -v
npm -v
```

---

# 🔧 Installation

Clone repository:

```bash
git clone <your-repository-url>
cd ejada-automation-framework
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# 🌍 Environment Configuration

Create a `.env` file in project root.

Example:

```env
BASE_URL=https://www.saucedemo.com/

STANDARD_USER=standard_user
LOCKED_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user
ERROR_USER=error_user
VISUAL_USER=visual_user

PASSWORD=secret_sauce
API_TOKEN=your_api_token_here
```

---

# ⚡ Execution Configuration

Framework supports:

- Parallel execution
- Cross-browser testing
- Chromium browser
- Firefox browser

Configured using Playwright projects in:

```bash
playwright.config.ts
```

---

# 🔐 Git Ignore

Generated files should not be committed.

Example `.gitignore`:

```gitignore
node_modules/
test-results/
playwright-report/
allure-results/
allure-report/
tests/UI/ACTUAL/
.env
.env.*
```

---

# ▶️ Running Tests

## Run all tests

```bash
npm test
```

---

## Run UI tests only

```bash
npm run test:ui
```

---

## Run API tests only

```bash
npm run test:api
```

---

## Run specific test file

```bash
npx playwright test tests/UI/login.spec.ts
```

---

## Run in headed mode

```bash
npx playwright test --headed
```

---

## Run in debug mode

```bash
npx playwright test --debug
```

---

# 🧪 UI Automation Features

Framework validates:

- Login scenarios
- Locked user handling
- Checkout flow
- Cart flow
- Inventory validation

Uses **Page Object Model (POM)** for maintainability and scalability.

Example:

```ts
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login(username, password);
await loginPage.verifyLoginSuccess();
```

---

# 🔌 API Testing

Framework supports Playwright API automation.

Current coverage:

- Books API testing
- GET requests
- POST requests with authentication token
- PATCH requests
- DELETE requests
- Status code validation
- Response body validation
- Header verification

Example:

```ts
const response = await request.get("/books");

expect(response.status()).toBe(200);
```

---

# 📸 Visual Regression Testing

Framework supports image comparison using:

- **Pixelmatch**
- **PNGJS**

### Baseline images

Stored in:

```bash
tests/UI/baseline/
```

These should be committed to Git.

---

### Runtime screenshots

Stored in:

```bash
tests/UI/ACTUAL/
```

These are generated automatically and should be ignored.

---

### Update visual snapshots

```bash
npm run test:update
```

---

### Comparison flow

Framework compares:

- `baseline.png`
- `visual_check.png`
- `diff.png`

If mismatched pixels are found, the test fails.

---

# 📊 Reports

## Playwright HTML Report

Generate/open report:

```bash
npm run report
```

Opens:

```bash
playwright-report/index.html
```

---

## Allure Report

Generate results:

```bash
npm test
```

Serve Allure report:

```bash
npx allure serve allure-results
```

Generate static report:

```bash
npm run allure:generate
```

Open Allure report:

```bash
npm run allure:open
```

---

# 🏗 Framework Design

## Page Object Model (POM)

Framework separates:

- Locators
- Actions
- Assertions

Located in:

```bash
pages/
```

---

## Data Driven Testing

Stored in:

```bash
utils/testData.ts
```

Example:

```ts
{
  name: 'Standard User',
  username: process.env.STANDARD_USER,
  expected: 'success'
}
```

---

# 🏛 Architecture Overview

```text
Tests → Page Objects → Utilities → Reports
```

---

# 🚀 CI/CD with GitHub Actions

Workflow file:

```bash
.github/workflows/playwright.yml
```

Runs automatically on:

- Push
- Pull Request

CI pipeline steps:

- Checkout code
- Install dependencies
- Install Playwright browsers
- Execute tests
- Generate reports
- Upload artifacts

---

# 🛠 Troubleshooting

## pixelmatch is not a function

Use correct import:

```ts
const pixelmatch = require("pixelmatch").default || require("pixelmatch");
```

---

## ENOENT diff.png error

Ensure folder exists:

```ts
fs.mkdirSync(path.dirname(diffPath), {
  recursive: true,
});
```

---

## Visual test failures in CI

Ensure:

- Same browser version
- Same OS
- Fixed viewport
- Same baseline source

Recommended configuration in `playwright.config.ts`:

```ts
use: {
  viewport: {
    width: 1440,
    height: 900
  }
}
```

---

# 👨‍💻 Author

Designed using scalable and maintainable enterprise automation practices.

---

# ⭐ Happy Testing

**Automate smarter.  
Catch bugs faster.  
Ship with confidence.**
