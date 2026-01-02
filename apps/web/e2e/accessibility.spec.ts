import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility and Visual", () => {
  test("should have no accessibility violations in dark mode", async ({
    page,
  }) => {
    await page.goto("/");
    // Ensure we are in dark mode (default)
    await page.evaluate(() => {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have no accessibility violations in light mode", async ({
    page,
  }) => {
    await page.goto("/");
    // Switch to light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    });

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("visual regression - home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
