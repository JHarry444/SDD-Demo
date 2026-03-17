import { test, expect } from "@playwright/test";

test("room discovery page shell", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("QA Hotel");
});
