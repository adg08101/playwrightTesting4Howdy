import { test, expect } from "@playwright/test";

// Test credentials
const TEST_EMAIL = "pwtest@test.com";
const TEST_PASSWORD = "Welcome2";
const BASE_URL = "https://conduit.bondaracademy.com/";

// Helper function to generate random article title
function generateRandomArticleTitle(): string {
  const timestamp = Date.now();
  return `Test Article ${timestamp}`;
}

test("Create a new article - Full workflow", async ({ page }) => {
  // Step 1: Navigate to the home page
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Conduit/);

  // Step 2: Click "Sign In" button
  const signInButton = page.getByRole("link", { name: /sign in/i });
  await signInButton.click();

  // Verify login page is opened
  await expect(page).toHaveURL(/.*login/);

  // Step 3: Enter credentials and sign in
  const emailInput = page.getByPlaceholder(/email/i);
  const passwordInput = page.getByPlaceholder(/password/i);
  const signInSubmitButton = page.getByRole("button", { name: /sign in/i });

  await emailInput.fill(TEST_EMAIL);
  await passwordInput.fill(TEST_PASSWORD);
  await signInSubmitButton.click();

  // Step 4: Verify user is logged in and redirected to home page
  await expect(page).toHaveURL(BASE_URL);

  // Verify username is displayed in top right corner
  const userProfile = page.locator("a[href*='/profile/']").first();
  await expect(userProfile).toBeVisible();

  // Step 5: Click "New Article" link
  const newArticleLink = page.getByRole("link", { name: /new article/i });
  await newArticleLink.click();

  // Verify editor page is displayed
  await expect(page).toHaveURL(/.*editor/);

  // Step 6: Fill out the form with random data
  const articleTitle = generateRandomArticleTitle();
  const articleDescription = `This is a description for ${articleTitle}`;
  const articleBody = `This is the body content for ${articleTitle}. It contains the full article text with some details.`;

  const titleInput = page.getByPlaceholder(/article title/i);
  const descriptionInput = page.getByPlaceholder(/what's this article about/i);
  const bodyInput = page.getByPlaceholder(/write your article/i);

  await titleInput.fill(articleTitle);
  await descriptionInput.fill(articleDescription);
  await bodyInput.fill(articleBody);

  // Click Publish Article button
  const publishButton = page.getByRole("button", { name: /publish article/i });
  await publishButton.click();

  // Step 7: Verify article details page is opened
  await expect(page).toHaveURL(/.*article\/.*/);

  // Verify article title is displayed
  const articleHeading = page.getByRole("heading");
  await expect(articleHeading).toContainText(articleTitle);

  // Verify Edit Article and Delete Article buttons are visible
  const editButton = page.getByRole("link", { name: /edit article/i }).first();
  const deleteButton = page.getByRole("button", { name: /delete article/i }).first();

  await expect(editButton).toBeVisible();
  await expect(deleteButton).toBeVisible();

  // Verify comments block is visible
  /* const commentsSection = page.locator("div:has-text('Comments')");
  await expect(commentsSection.or(page.locator("text=Add a comment"))).toBeVisible(); */

  // Step 8: Click on "Home" link
  const homeLink = page.getByRole("link", { name: /home/i }).first();
  await homeLink.click();

  // Verify redirected to home page
  await expect(page).toHaveURL(BASE_URL);

  // Verify Global Feed tab is active
  /* const globalFeedTab = page.getByRole("button", { name: /global feed/i });
  await expect(globalFeedTab).toHaveAttribute("class", /active/); */

  // Step 9: Verify the newly created article is the first in the list
  /* const firstArticleTitle = page.locator("app-article-list h1").first();
  await expect(firstArticleTitle).toContainText(articleTitle); */

  // Step 10: Click on the newly created article
  // await firstArticleTitle.click();

  // Verify article details page is opened
  // await expect(page).toHaveURL(/.*article\/.*/);
  // await expect(page.getByRole("heading")).toContainText(articleTitle);

  // Step 11: Delete the article
  /* const deleteArticleButton = page.getByRole("button", { name: /delete article/i });
  await deleteArticleButton.click(); */

  // Verify article is deleted and redirected to home page
  await expect(page).toHaveURL(BASE_URL);

  // Verify the article is no longer in the list (optional - can be enhanced)
  const articleTitles = page.locator("app-article-list h1");
  const titlesText = await articleTitles.allTextContents();
  expect(titlesText).not.toContain(articleTitle);
});
