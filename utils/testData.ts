export const loginScenarios = [
  {
    name: "Standard User",
    username: process.env.STANDARD_USER!,
    password: process.env.PASSWORD!,
    expected: "success",
  },
  {
    name: "Locked User",
    username: process.env.LOCKED_USER!,
    password: process.env.PASSWORD!,
    expected: "locked",
  },
  {
    name: "Problem User",
    username: process.env.PROBLEM_USER!,
    password: process.env.PASSWORD!,
    expected: "failure",
    behavior: "problem",
  },
  {
    name: "Performance Glitch User",
    username: process.env.PERFORMANCE_USER!,
    password: process.env.PASSWORD!,
    expected: "success",
    behavior: "slow",
  },
  {
    name: "Error User",
    username: process.env.ERROR_USER!,
    password: process.env.PASSWORD!,
    expected: "error",
    behavior: "error",
  },
  {
    name: "Visual User",
    username: process.env.VISUAL_USER!,
    password: process.env.PASSWORD!,
    expected: "success",
    behavior: "visual-check",
  },
];

export const testData = {
  productName: "Sauce Labs Backpack",
};
