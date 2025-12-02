import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("Test login on react-vite/", async ({ page }) => {
  await page.goto("https://adg08101.github.io/react-vite/");
  await page.getByRole("link", { name: "Form" }).click();
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("none");
  await page.getByRole("textbox", { name: "Username" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("adg08101");
  await page.getByRole("textbox", { name: "Email" }).fill("adg08101@gmail.com");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("none");
  await page.getByRole("combobox").selectOption("Cuba");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText(
    "Product List Data Context"
  );
});
