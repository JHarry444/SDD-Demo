import { test, expect } from "@playwright/test";

test("auth flow page shell", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/QA Hotel|Vite|React/i);
});
