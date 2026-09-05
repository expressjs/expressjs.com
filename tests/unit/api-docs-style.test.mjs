import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_ROOT = join(ROOT, 'src', 'content', 'api');
const VERSIONS = ['4x', '5x'];

function collectMdx(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collectMdx(full);
    return entry.name.endsWith('.mdx') ? [full] : [];
  });
}

function findOffendingLines(isOffending) {
  const offenders = [];
  for (const file of VERSIONS.flatMap((version) => collectMdx(join(API_ROOT, version)))) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, index) => {
        if (isOffending(line)) {
          offenders.push(`${relative(ROOT, file)}:${index + 1} ${line.trim()}`);
        }
      });
  }
  return offenders;
}

test('result comments quote string values with single quotes', () => {
  const offenders = findOffendingLines(
    (line) => /^\s*\/\/\s*=>.*"/.test(line) && !line.includes('{')
  );
  assert.deepEqual(offenders, []);
});

test('result comments do not end with stray punctuation', () => {
  const offenders = findOffendingLines((line) => /^\s*\/\/\s*=>.*[:;,]\s*$/.test(line));
  assert.deepEqual(offenders, []);
});

test('req.host is documented before req.hostname', () => {
  for (const version of VERSIONS) {
    const file = join(API_ROOT, version, 'api', 'request', 'index.mdx');
    const content = readFileSync(file, 'utf8');
    const host = content.indexOf('### req.host\n');
    const hostname = content.indexOf('### req.hostname\n');
    assert.notEqual(host, -1, `req.host heading is missing in ${version}`);
    assert.notEqual(hostname, -1, `req.hostname heading is missing in ${version}`);
    assert.ok(host < hostname, `req.host should precede req.hostname in ${version}`);
  }
});

test('request and response pages describe themselves as req and res', () => {
  const pages = [
    ['request', 'req'],
    ['response', 'res'],
  ];
  for (const version of VERSIONS) {
    for (const [page, name] of pages) {
      const file = join(API_ROOT, version, 'api', page, 'index.mdx');
      const description = readFileSync(file, 'utf8').match(/^description: (.*)$/m);
      assert.ok(description, `${version}/${page} has no description`);
      assert.ok(
        description[1].startsWith(`The ${name} object represents`),
        `${version}/${page} description should start with 'The ${name} object represents'`
      );
    }
  }
});
