import { test, expect } from "@playwright/test";

test("les chantiers s’affichent bien", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await expect(page.locator("h2")).toHaveText("Nos chantiers en cours");
  await expect(page.locator("article")).toHaveCount(2); // Résidence Atlas + Ifriqya
});
