import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  retries: 1,
  workers: 3,
  timeout: 90000,

  reporter: [["html"], ["allure-playwright"]],

  use: {
    baseURL: process.env.BASE_URL,

    headless: process.env.CI ? true : false,

    launchOptions: {
      slowMo: process.env.SLOWMO ? 500 : 300,
      args: ["--start-maximized"],
    },

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
});
