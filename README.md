# 🚀 Ejada Automation Framework

A scalable **Playwright + TypeScript** automation framework for **UI and API testing** built using modern automation best practices.

This framework includes:

- ✅ UI Automation Testing
- ✅ API Testing
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
npx playwright test tests/UI
```

---

## Run API tests only

```bash
npx playwright test tests/API
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

Uses **Page Object Model** for maintainability.

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
- Status code validation
- Response body validation
- Header verification
- Token-based authentication

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

If mismatched pixels are found, test fails.

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
npx playwright test
```

Serve Allure report:

```bash
npx allure serve allure-results
```

Generate static report:

```bash
npx allure generate allure-results --clean
```

Open:

```bash
allure-report/index.html
```

---

# 🏗 Framework Design

## Page Object Model (POM)

Separates:

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

# 🚀 CI/CD with GitHub Actions

Workflow file:

```bash
.github/workflows/playwright.yml
```

Runs automatically on:

- Push
- Pull Request

Example CI steps:

- Checkout code
- Install dependencies
- Install Playwright browsers
- Run tests
- Upload reports

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

Recommended in `playwright.config.ts`:

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

Built for learning, scalability, and enterprise-grade automation practices.

---

# ⭐ Happy Testing

**Automate smarter.  
Catch bugs faster.  
Ship with confidence.**
