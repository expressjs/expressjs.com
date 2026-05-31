import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRawMarkdown, buildSection, textResponse } from '@/utils/llms';

export async function getStaticPaths() {
  const docs = await getCollection('docs');
  const versions = [...new Set(docs.map((d) => d.id.replace('en/', '').split('/')[0]))];
  return versions.map((version) => ({ params: { version } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const siteUrl = site as URL;
  const version = params.version as string;
  const label = `v${version.replace('x', '')}`;

  const docs = await getCollection('docs');
  const pages = await getCollection('pages');

  const enDocs = docs.filter((d) => d.id.startsWith(`en/${version}/`));

  // Migration and advanced pages from pages collection (not versioned)
  const migrations = pages.filter((d) => d.id.startsWith('en/guide/migrating'));
  const advancedPages = pages.filter((d) => d.id.startsWith('en/advanced/'));

  const sections: string[] = [`# Express.js — Guides (${label})\n`];
  sections.push('> Fast, unopinionated, minimalist web framework for Node.js\n');

  for (const entry of enDocs) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  for (const entry of [...migrations, ...advancedPages]) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  return textResponse(sections.join('\n'));
};
