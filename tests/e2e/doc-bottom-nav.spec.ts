import { test, expect } from '@playwright/test';

// Regression coverage for https://github.com/expressjs/expressjs.com/issues/2486
const DOC_PATH = '/en/guide/migrating-4/';

test.describe('Doc bottom navigation', () => {
  test('should not overflow horizontally on a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 900 });
    await page.goto(DOC_PATH);

    const nav = page.locator('.doc-nav');
    await expect(nav).toBeVisible();

    const overflow = await nav.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('should move the next link above the previous link when they cannot share a line', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 400, height: 900 });
    await page.goto(DOC_PATH);

    const prev = page.locator('.doc-nav__link--prev');
    const next = page.locator('.doc-nav__link--next');

    await expect(prev).toBeVisible();
    await expect(next).toBeVisible();

    const prevBox = await prev.boundingBox();
    const nextBox = await next.boundingBox();

    if (!prevBox || !nextBox) {
      throw new Error('expected both doc nav links to be laid out');
    }

    expect(nextBox.y + nextBox.height).toBeLessThanOrEqual(prevBox.y);
  });

  test('should keep both links on a single line on a wide viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(DOC_PATH);

    const prevBox = await page.locator('.doc-nav__link--prev').boundingBox();
    const nextBox = await page.locator('.doc-nav__link--next').boundingBox();

    if (!prevBox || !nextBox) {
      throw new Error('expected both doc nav links to be laid out');
    }

    expect(nextBox.y).toBeCloseTo(prevBox.y, 0);
    expect(nextBox.x).toBeGreaterThan(prevBox.x);
  });
});
