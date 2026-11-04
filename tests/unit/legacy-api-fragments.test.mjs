import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addLegacyApiTargets, getLegacyApiTarget } from '../../src/utils/legacy-api-fragments.mjs';

test('maps API member signatures to compiled slugs, ignoring section titles', () => {
  const targets = {};
  addLegacyApiTargets(targets, 'response', [
    { text: 'Methods', slug: 'methods' },
    { text: 'res.send([body])', slug: 'ressendbody' },
    { text: 'res.headersSent', slug: 'resheaderssent' },
  ]);
  addLegacyApiTargets(targets, 'router', [{ text: 'Router()', slug: 'router' }]);
  assert.deepEqual(targets, {
    'res.send': 'response/#ressendbody',
    'res.headersSent': 'response/#resheaderssent',
    router: 'router/#router',
  });
});

test('preserves locale, version, query and unversioned paths', () => {
  for (const path of ['/en/4x/api', '/fr/5x/api/', '/en/api/']) {
    assert.equal(
      getLegacyApiTarget(`https://expressjs.com${path}?source=old#res%2Esend`, {
        'res.send': 'response/#ressend',
      }),
      `https://expressjs.com${path.replace(/\/$/, '')}/response/?source=old#ressend`
    );
  }
});

test('does not redirect unknown, current, malformed or inherited fragments', () => {
  for (const fragment of ['', 'overview', 'res.unknown', '%E0%A4%A', '__proto__', 'toString']) {
    assert.equal(getLegacyApiTarget(`https://expressjs.com/en/5x/api/#${fragment}`, {}), undefined);
  }
});
