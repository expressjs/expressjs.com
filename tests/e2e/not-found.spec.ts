import { test, expect } from '@playwright/test';
import enStrings from '../../src/i18n/ui/en.json' with { type: 'json' };
import esStrings from '../../src/i18n/ui/es.json' with { type: 'json' };
import frStrings from '../../src/i18n/ui/fr.json' with { type: 'json' };
import deStrings from '../../src/i18n/ui/de.json' with { type: 'json' };
import itStrings from '../../src/i18n/ui/it.json' with { type: 'json' };
import jaStrings from '../../src/i18n/ui/ja.json' with { type: 'json' };
import koStrings from '../../src/i18n/ui/ko.json' with { type: 'json' };
import ptBrStrings from '../../src/i18n/ui/pt-br.json' with { type: 'json' };
import zhCnStrings from '../../src/i18n/ui/zh-cn.json' with { type: 'json' };
import zhTwStrings from '../../src/i18n/ui/zh-tw.json' with { type: 'json' };

const MISSING_PATH = 'this-page-does-not-exist';

const languagesToTest = [
  { code: 'es', strings: esStrings.error404 },
  { code: 'fr', strings: frStrings.error404 },
  { code: 'de', strings: deStrings.error404 },
  { code: 'it', strings: itStrings.error404 },
  { code: 'ja', strings: jaStrings.error404 },
  { code: 'ko', strings: koStrings.error404 },
  { code: 'pt-br', strings: ptBrStrings.error404 },
  { code: 'zh-cn', strings: zhCnStrings.error404 },
  { code: 'zh-tw', strings: zhTwStrings.error404 },
];

/**
 * 404 Page E2E Tests
 *
 * A single 404 page is served for every missing URL, and it switches to the
 * language of the requested URL on the client.
 */
test.describe('404 Page', () => {
  // Paths without a supported language prefix (including removed locales) stay in English.
  for (const path of [`/en/${MISSING_PATH}`, `/${MISSING_PATH}`, `/ru/guide/${MISSING_PATH}`]) {
    test(`should show the English 404 page for ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page).toHaveTitle(`${enStrings.error404.title} · Express.js`);
      await expect(page.getByRole('heading', { name: enStrings.error404.heading })).toBeVisible();
      await expect(page.getByText(enStrings.error404.message)).toBeVisible();
      await expect(page.getByRole('link', { name: enStrings.error404.goHome })).toHaveAttribute(
        'href',
        '/'
      );
      await expect(page.getByRole('link', { name: enStrings.error404.reportIssue })).toBeVisible();
    });
  }

  for (const { code, strings } of languagesToTest) {
    test(`should show the 404 page in ${code} for /${code}/ URLs`, async ({ page }) => {
      const response = await page.goto(`/${code}/guide/${MISSING_PATH}`);
      expect(response?.status()).toBe(404);

      await expect(page.locator('html')).toHaveAttribute('lang', code);
      await expect(page).toHaveTitle(`${strings.title} · Express.js`);
      await expect(page.getByRole('heading', { name: strings.heading })).toBeVisible();
      await expect(page.getByText(strings.message)).toBeVisible();
      await expect(page.getByRole('link', { name: strings.goHome })).toHaveAttribute(
        'href',
        `/${code}/`
      );
    });
  }
});
