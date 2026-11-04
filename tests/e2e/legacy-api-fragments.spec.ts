import { test, expect } from '@playwright/test';

for (const [base, fragment, section, heading] of [
  ['/en/4x/api', 'res.send', 'response', 'res.send()'],
  ['/en/5x/api/', 'app.use', 'application', 'app.use()'],
  ['/fr/5x/api/', 'req.body', 'request', 'req.body'],
  ['/en/api/', 'express.json', 'express', 'express.json()'],
  ['/en/5x/api/', 'router.use', 'router', 'router.use()'],
  ['/en/5x/api/', 'res%2Esend', 'response', 'res.send()'],
]) {
  test(`redirects ${base}#${fragment} to its API heading`, async ({ page }) => {
    await page.goto(`${base}?from=legacy#${fragment}`);
    await expect(page).toHaveURL(new RegExp(`/api/${section}/\\?from=legacy#`));
    const target = page.getByRole('heading', { name: heading, exact: true });
    await expect(target).toBeVisible();
    expect(await target.getAttribute('id')).toBe(new URL(page.url()).hash.slice(1));
  });
}

for (const fragment of ['overview', 'res.notARealMethod', '%E0%A4%A', '__proto__']) {
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
  await expect(page).toHaveURL(/\/en\/5x\/api\/response\/#resstatus/);
});
