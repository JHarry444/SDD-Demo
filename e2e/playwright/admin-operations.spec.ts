import { test, expect } from "@playwright/test";

test("admin operations shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("QA Hotel");
});
