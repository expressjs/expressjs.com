import { test, expect } from '@playwright/test';
import enStrings from '../../src/i18n/ui/en.json' with { type: 'json' };

const EDIT_URL_BASE = 'https://github.com/expressjs/expressjs.com/edit/main/src/content/blog';

/**
 * Blog Post E2E Tests
 *
 * The post URL is a lowercased slug without an extension, so the edit link has to
 * point at the source file itself. Cover a mixed-case `.md` and a mixed-case `.mdx`.
 */
const posts = [
  {
    url: '/en/blog/2024-10-01-herodevs-partnership-announcement',
    file: '2024-10-01-HeroDevs-partnership-announcement.md',
  },
  {
    url: '/en/blog/2026-10-28-cve-2026-111181',
    file: '2026-10-28-CVE-2026-111181.mdx',
  },
];

test.describe('Blog Post', () => {
  for (const { url, file } of posts) {
    test(`should link to the source file of ${file} for editing`, async ({ page }) => {
      await page.goto(url);

      const editLink = page.getByRole('link', { name: enStrings.page.editOnGitHub });
      await expect(editLink).toHaveAttribute('href', `${EDIT_URL_BASE}/${file}`);
    });
  }
});
