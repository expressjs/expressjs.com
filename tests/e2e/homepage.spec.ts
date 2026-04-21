import { test, expect } from '@playwright/test';
import enStrings from '../../src/i18n/ui/en.json' with { type: 'json' };

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
    // 1. Verify Tagline
    const tagline = page.getByRole('heading', { level: 1 });
    await expect(tagline).toBeVisible();
    await expect(tagline).toHaveText(enStrings.hero.tagline);

    // 2. Verify Logos
    const standardLogo = page.getByTestId('logo-standard').first();
    const kawaiiLogo = page.getByAltText(enStrings.hero.kawaiiLogoAlt);

    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden();

    // 3. Verify Version
    const versionText = page.getByTestId('hero-brand').getByText(latestVersion);
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
      const card = featureSection.getByTestId('card').filter({ hasText: feature.title });
      await expect(card).toBeVisible();
      await expect(card.locator('p')).toHaveText(feature.body);
    }
  });

  test('should display the installation command', async ({ page }) => {
    const installCode = page.getByTestId('install-command');
    await expect(installCode).toBeVisible();
    await expect(installCode).toContainText(enStrings.hero.tagline); // Verify it's in the hero area
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

  test('should toggle the Kawaii logo when the data attribute is set', async ({ page }) => {
    const standardLogo = page.getByTestId('logo-standard').first();
    const kawaiiLogo = page.getByAltText(enStrings.hero.kawaiiLogoAlt);

    await expect(standardLogo).toBeVisible();
    await expect(kawaiiLogo).toBeHidden();

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-kawaii', 'true');
    });

    await expect(kawaiiLogo).toBeVisible();
    await expect(standardLogo).toBeHidden();
  });
});
