import assert from 'node:assert/strict';
import { test } from 'node:test';

import { stripMdxSyntax } from '../../src/utils/llms.ts';

test('removes MDX import statements and JSX tags from prose', () => {
  const input = [
    "import Alert from '@components/primitives/Alert/Alert.astro';",
    '',
    '<Alert type="info">',
    'Some text.',
    '</Alert>',
  ].join('\n');

  assert.equal(stripMdxSyntax(input), 'Some text.');
});

test('keeps import statements inside fenced code blocks', () => {
  const input = [
    "import CodeTabs from '@components/primitives/Tabs/CodeTabs.astro';",
    '',
    '```mjs title="index.mjs"',
    "import express from 'express';",
    '',
    'const app = express();',
    '```',
  ].join('\n');

  assert.equal(
    stripMdxSyntax(input),
    [
      '```mjs title="index.mjs"',
      "import express from 'express';",
      '',
      'const app = express();',
      '```',
    ].join('\n')
  );
});

test('keeps code inside indented and tilde fences untouched', () => {
  const input = [
    '- Step one:',
    '',
    '  ```ts',
    "  import type { Request } from 'express';",
    '  const items: Array<Item> = [];',
    '  ```',
    '',
    '~~~js',
    "import path from 'node:path';",
    '~~~',
  ].join('\n');

  assert.equal(stripMdxSyntax(input), input);
});
