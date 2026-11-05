import { test, expect } from '@playwright/test';

for (const version of ['4x', '5x']) {
  for (const [fragment, heading] of [
    ['app.get', 'app.get(name)'],
    ['app.get.method', 'app.get()'],
    ['app.delete.method', 'app.delete()'],
    ['app.post.method', 'app.post()'],
    ['app.put.method', 'app.put()'],
    ['app.listen_path_callback', 'app.listen()'],
    ['app.settings.table', 'Application Settings'],
  ]) {
    test(`${version} legacy ${fragment} reaches ${heading}`, async ({ page, baseURL }) => {
      await page.goto(`/en/${version}/api/?from=legacy#${fragment}`);
      await expect(page).toHaveURL(
        new URL(`/en/${version}/api/application/?from=legacy#${fragment}`, baseURL).href
      );
      const anchor = page.locator(`[id="${fragment}"]`);
      await expect(anchor).toBeAttached();
      await expect(
        anchor.locator('xpath=following-sibling::*[self::h2 or self::h3 or self::h4][1]')
      ).toHaveText(heading);
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeInViewport();
    });
  }
}

for (const [base, fragment, section, heading] of [
  ['/en/4x/api', 'res.send', 'response', 'res.send()'],
  ['/fr/5x/api/', 'req.body', 'request', 'req.body'],
  ['/en/api/', 'express.router', 'express', 'express.Router()'],
  ['/en/5x/api/', 'router.use', 'router', 'router.use()'],
  ['/en/5x/api/', 'res%2Esend', 'response', 'res.send()'],
]) {
  test(`redirects ${base}#${fragment} to its legacy anchor`, async ({ page }) => {
    await page.goto(`${base}?from=legacy#${fragment}`);
    await expect(page).toHaveURL(new RegExp(`/api/${section}/\\?from=legacy#${fragment}$`));
    const anchor = page.locator(`[id="${decodeURIComponent(fragment)}"]`);
    await expect(anchor).toBeAttached();
    await expect(
      anchor.locator('xpath=following-sibling::*[self::h2 or self::h3 or self::h4][1]')
    ).toHaveText(heading);
  });
}

for (const fragment of ['overview', 'unknown.method', '%E0%A4%A', '__proto__']) {
  test(`leaves unknown or malformed fragment ${fragment} unchanged`, async ({ page }) => {
    await page.goto(`/en/5x/api/#${fragment}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`/en/5x/api/#${fragment}$`));
  });
}

test('handles a legacy fragment added after loading the overview', async ({ page }) => {
  await page.goto('/en/5x/api/');
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.evaluate(() => {
    window.location.hash = 'res.status';
  });
  await expect(page).toHaveURL(/\/en\/5x\/api\/response\/#res\.status$/);
});

test('supports direct legacy links on section pages', async ({ page }) => {
  await page.goto('/en/5x/api/application/#app.get');
  await expect(page.getByRole('heading', { name: 'app.get(name)', exact: true })).toBeInViewport();
});
