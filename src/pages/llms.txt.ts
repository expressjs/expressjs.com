import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site as URL;

  const api = await getCollection('api');

  // Extract API versions from the collection (e.g. "5x", "4x", "3x")
  const apiVersions = [...new Set(api.map((d) => d.id.split('/')[0]))].sort().reverse();

  // Extract docs versions (e.g. "5x", "4x")
  const docs = await getCollection('docs');
  const docsVersions = [...new Set(docs.map((d) => d.id.replace('en/', '').split('/')[0]))]
    .sort()
    .reverse();

  const lines: string[] = [
    '# Express.js',
    '',
    '> Express is a minimal and flexible Node.js web application framework that provides',
    '> a robust set of features for building web and mobile applications. It is the',
    '> standard server framework for Node.js and is part of the OpenJS Foundation.',
    '',
    '- Website: https://expressjs.com',
    '- GitHub: https://github.com/expressjs/express',
    '- npm: https://www.npmjs.com/package/express',
    '- License: MIT',
    '',
    '## Documentation Sets',
    '',
    ...docsVersions.map(
      (v) =>
        `- [Guides (${`v${v.replace('x', '')}`})](${new URL(`/llms/guides-${v}.txt`, siteUrl).href}): Getting started, routing, middleware, error handling, debugging, and advanced topics for Express ${`v${v.replace('x', '')}`}`
    ),
    ...apiVersions.map(
      (v) =>
        `- [API Reference (${`v${v.replace('x', '')}`})](${new URL(`/llms/api-${v}.txt`, siteUrl).href}): Complete API documentation for Express ${`v${v.replace('x', '')}`}`
    ),
    `- [Official Middleware](${new URL('/llms/middleware.txt', siteUrl).href}): Documentation for middleware modules maintained by the Express.js team`,
    `- [Resources](${new URL('/llms/resources.txt', siteUrl).href}): Community resources, tools, and utilities for Express.js`,
    `- [Full Documentation](${new URL('/llms/full.txt', siteUrl).href}): All content in a single file`,
    '',
    '## Notes',
    '',
    '- All content is sourced from the official Express.js documentation at https://expressjs.com',
    '- Documentation is maintained by the Express.js team',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
