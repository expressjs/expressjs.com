import { test, expect } from '@playwright/test';
import enStrings from '../../src/i18n/ui/en.json' with { type: 'json' };

/**
 * Homepage E2E Tests
 * Includes: Hero, Features, Theme Toggle, Kawaii Toggle, Footer and Language Selector tests.
 *
 * TODO: Add tests for Sidebar and Orama Search component in the future.
 */

test.describe('Homepage Content', () => {
  let latestVersion: string;

  test.beforeAll(async () => {
    const response = await fetch('https://registry.npmjs.org/express/latest');
    const data = await response.json();
    latestVersion = data.version;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should display the core brand elements and features', async ({ page }) => {
    const heroBrand = page.getByTestId('hero-brand');

    // 1. Verify Tagline
    const tagline = page.getByRole('heading', { level: 1 });
    await expect(tagline).toBeVisible();
    await expect(tagline).toHaveText(enStrings.hero.tagline);

    // 2. Verify Logos
    const standardLogo = heroBrand.getByTestId('logo-standard').first();
    const kawaiiLogo = heroBrand.getByAltText(enStrings.hero.kawaiiLogoAlt);

    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden();

    // 3. Verify Version
    const versionText = heroBrand.getByText(latestVersion);
    await expect(versionText).toBeVisible();

    // 4. Verify Features Section
    const featureSection = page.getByTestId('features-section');
    const featuresTitle = featureSection.getByRole('heading', { level: 2 });
    await expect(featuresTitle).toHaveText(enStrings.features.title);

    // 5. Verify all four feature cards
    const features = [
      enStrings.features.webapplication,
      enStrings.features.api,
      enStrings.features.performance,
      enStrings.features.middleware,
    ];

    for (const feature of features) {
      const card = featureSection.getByTestId('card').filter({
        has: page.getByRole('heading', { name: feature.title, exact: true }),
      });
      await expect(card).toBeVisible();
      await expect(card.locator('p')).toHaveText(feature.body);
    }
  });

  test('should display the installation command', async ({ page }) => {
    const installCode = page.getByTestId('install-command');
    await expect(installCode).toBeVisible();
    await expect(installCode).toContainText(/npm install express --save/i);
  });

  test('should have a working "Get Started" call to action', async ({ page }) => {
    const getStartedBtn = page.getByRole('link', { name: enStrings.hero.getStarted });
    await expect(getStartedBtn).toHaveAttribute('href', /\/en\/5x\/starter\/installing/);

    await getStartedBtn.click();
    await expect(page).toHaveURL(/\/en\/5x\/starter\/installing/);
  });

  test('should display the example code block', async ({ page }) => {
    const exampleCode = page.getByTestId('example-code');
    await expect(exampleCode).toBeVisible();
  });

  test('should toggle Kawaii mode and persist it', async ({ page }) => {
    const root = page.locator('html');
    const toggleBtn = page.locator('#kawaiiToggle');
    const heroBrand = page.getByTestId('hero-brand');

    const standardLogo = heroBrand.getByTestId('logo-standard').first();
    const kawaiiLogo = heroBrand.getByAltText(enStrings.hero.kawaiiLogoAlt);

    // Ensure page is ready
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toBeEnabled();

    // Initial state
    await expect(root).not.toHaveAttribute('data-kawaii');
    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden();

    // Click toggle
    await toggleBtn.click({ force: true });

    // Wait until DOM actually updates
    await expect
      .poll(async () => {
        return await page.evaluate(() => document.documentElement.hasAttribute('data-kawaii'));
      })
      .toBe(true);

    // Assert accessibility state
    await expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');

    // Assert UI change
    await expect(kawaiiLogo).toBeVisible();
    await expect(standardLogo).toBeHidden();

    // Assert persistence
    await expect
      .poll(async () => {
        return await page.evaluate(() => localStorage.getItem('kawaii'));
      })
      .toBe('true');

    // Reload → should persist
    await page.reload();

    await expect(root).toHaveAttribute('data-kawaii', '');
    await expect(kawaiiLogo).toBeVisible();

    // Toggle OFF
    await toggleBtn.click({ force: true });

    await expect
      .poll(async () => {
        return await page.evaluate(() => document.documentElement.hasAttribute('data-kawaii'));
      })
      .toBe(false);

    await expect(root).not.toHaveAttribute('data-kawaii');
    await expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
    await expect(standardLogo).toBeVisible();

    // Storage cleared
    await expect
      .poll(async () => {
        return await page.evaluate(() => localStorage.getItem('kawaii'));
      })
      .toBe(null);
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    const root = page.locator('html');
    const toggleBtn = page.locator('#theme-toggle-button');

    const initialTheme = (await root.getAttribute('data-theme')) || 'light';
    const targetTheme = initialTheme === 'light' ? 'dark' : 'light';

    await toggleBtn.click();
    await expect(root).toHaveAttribute('data-theme', targetTheme);

    const savedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(savedTheme).toBe(targetTheme);

    await toggleBtn.click();
    await expect(root).toHaveAttribute('data-theme', initialTheme);
  });

  test('should display copyright and foundation links', async ({ page }) => {
    const footer = page.getByTestId('footer');
    await expect(footer).toBeVisible();

    // Verify copyright text
    await expect(footer).toContainText(/Copyright/);
    await expect(footer).toContainText(/OpenJS Foundation/);

    // Verify key legal and foundation links
    const foundationLinks = [
      { name: /The OpenJS Foundation/i, href: 'https://openjsf.org' },
      { name: /Privacy Policy/i, href: /privacy-policy/ },
      { name: /Code of Conduct/i, href: /code-of-conduct/ },
      { name: /Security Policy/i, href: /security\/policy/ },
      { name: /Trademark Policy/i, href: /trademark-policy/ },
      { name: /Terms of Use/i, href: /terms-of-use/ },
    ];

    for (const link of foundationLinks) {
      const locator = footer.getByRole('link', { name: link.name }).first();
      await expect(locator).toBeVisible();
      await expect(locator).toHaveAttribute('href', link.href);
    }
  });

  test('should display social media links', async ({ page }) => {
    const footer = page.getByTestId('footer');

    const githubLink = footer.getByRole('link', { name: /GitHub/i });
    const youtubeLink = footer.getByRole('link', { name: /Youtube/i });
    const xLink = footer.getByRole('link', { name: /X account/i });
    const slackLink = footer.getByRole('link', { name: /slack/i });
    const openCollectiveLink = footer.getByRole('link', { name: /Open Collective/i });
    const blueskyLink = footer.getByRole('link', { name: /bluesky/i });
    const rssLink = footer.getByRole('link', { name: /RSS Feed/i });

    await expect(githubLink).toBeVisible();
    await expect(youtubeLink).toBeVisible();
    await expect(xLink).toBeVisible();
    await expect(slackLink).toBeVisible();
    await expect(openCollectiveLink).toBeVisible();
    await expect(blueskyLink).toBeVisible();
    await expect(rssLink).toBeVisible();
  });
});
