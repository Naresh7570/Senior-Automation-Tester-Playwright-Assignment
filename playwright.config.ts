import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  retries: 1,
  workers: 2,
  timeout: 40000,

  reporter: [["html"], ["allure-playwright"]],

  use: {
    baseURL: process.env.BASE_URL,

    headless: false,
    viewport: {
    width: 1440,
    height: 900,
  },

    launchOptions: {
      slowMo: 500,
      args: ["--start-maximized"],
    },

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on",
  },

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
});
