import { test, expect } from '@playwright/test';

test.describe('Homepage Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the English homepage before each test
    await page.goto('/en');
  });

  test('should display the core brand elements', async ({ page }) => {
    // 1. Verify the Tagline (H1) exists
    const tagline = page.getByRole('heading', { level: 1 });
    await expect(tagline).toBeVisible();

    // 2. Verify the Standard Logo is visible and the Kawaii logo is hidden
    const standardLogo = page.locator('.hero__logo-default').first();
    const kawaiiLogo = page.locator('.hero__logo-kawaii');

    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden(); // Hidden by default as we discovered!

    // 3. Verify Version text is present
    // It's in BodyMd next to the logo
    const versionText = page.locator('.hero__logo + p, .hero__logo + div');
    await expect(versionText).toContainText(/\d+\.\d+\.\d+/);
  });

  test('should display the installation command', async ({ page }) => {
    // Verify the first code block contains "npm install"
    const installCode = page.locator('.hero__code').first();
    await expect(installCode).toBeVisible();
    await expect(installCode).toContainText(/npm install/i);
  });

  test('should have a working "Get Started" call to action', async ({ page }) => {
    const getStartedBtn = page.getByRole('link', { name: /Get Started/i });

    // Verify it points to the correct 5.x installation page
    await expect(getStartedBtn).toHaveAttribute('href', /\/en\/5x\/starter\/installing/);

    // Test navigation
    await getStartedBtn.click();
    await expect(page).toHaveURL(/\/en\/5x\/starter\/installing/);
  });

  test('should display the example code block', async ({ page }) => {
    // Verify the secondary code block (example code) is visible on larger screens
    const exampleCode = page.locator('.hero__example-code');
    await expect(exampleCode).toBeVisible();
  });

  test('should toggle the Kawaii logo when the data attribute is set', async ({ page }) => {
    const standardLogo = page.locator('.hero__logo-default').first();
    const kawaiiLogo = page.locator('.hero__logo-kawaii');

    // Initially standard is visible, kawaii is hidden
    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden();

    // Trigger Kawaii mode via script
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-kawaii', 'true');
    });

    // Now kawaii should be visible, standard should be hidden
    await expect(kawaiiLogo).toBeVisible();
    await expect(standardLogo).toBeHidden();
  });
});
