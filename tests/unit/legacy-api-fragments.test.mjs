import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getLegacyApiTarget } from '../../src/utils/legacy-api-fragments.mjs';

test('preserves the original fragment, locale, version and query string', () => {
  for (const path of ['/en/4x/api', '/fr/5x/api/', '/en/api/']) {
    for (const fragment of ['app.get', 'app.get.method', 'app.listen_path_callback']) {
      assert.equal(
        getLegacyApiTarget(`https://expressjs.com${path}?source=old#${fragment}`),
        `https://expressjs.com${path.replace(/\/$/, '')}/application/?source=old#${fragment}`
      );
    }
  }
});

test('routes all legacy sections and the express.static example', () => {
  for (const [fragment, section] of [
    ['express', 'express'],
    ['express.router', 'express'],
    ['app', 'application'],
    ['req.body', 'request'],
    ['res%2Esend', 'response'],
    ['router', 'router'],
    ['router.METHOD', 'router'],
    ['example.of.express.static', 'express'],
  ]) {
    assert.equal(
      getLegacyApiTarget(`https://expressjs.com/en/5x/api/#${fragment}`),
      `https://expressjs.com/en/5x/api/${section}/#${fragment}`
    );
  }
});

test('leaves current, unknown and malformed fragments and section pages alone', () => {
  for (const fragment of ['', 'overview', 'unknown.method', '%E0%A4%A', '__proto__', 'toString']) {
    assert.equal(getLegacyApiTarget(`https://expressjs.com/en/5x/api/#${fragment}`), undefined);
  }
  assert.equal(
    getLegacyApiTarget('https://expressjs.com/en/5x/api/application/#app.get'),
    undefined
  );
});

for (const version of ['4x', '5x']) {
  test(`${version} explicitly distinguishes historical application IDs`, () => {
    const source = readFileSync(
      new URL(`../../src/content/api/${version}/api/application/index.mdx`, import.meta.url),
      'utf8'
    );
    for (const [id, heading] of [
      ['app.get', '### app.get(name)'],
      ['app.get.method', '### app.get()'],
      ['app.delete.method', '### app.delete()'],
      ['app.post.method', '### app.post()'],
      ['app.put.method', '### app.put()'],
      ['app.onmount', "### app.on('mount')"],
      ['app.listen_path_callback', '### app.listen()'],
      ['app.settings.table', '#### Application Settings'],
    ]) {
      const line = source.split('\n').find((line) => line.includes(`<span id="${id}" `));
      assert.ok(line, `missing legacy target ${id}`);
      assert.equal(line.split('<span')[0], heading, `${id} must be inside its heading`);
      assert.ok(line.includes('className="legacy-api-anchor"'), `${id} needs heading alignment`);
    }
  });
}
