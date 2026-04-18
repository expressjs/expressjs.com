import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRawMarkdown, buildSection, textResponse } from '@/utils/llms';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site as URL;

  const docs = await getCollection('docs');
  const api = await getCollection('api');
  const pages = await getCollection('pages');

  // Filter to English 5x content
  const enDocs = docs.filter((d) => d.id.startsWith('en/5x/'));
  const apiDocs = api.filter((d) => d.id.startsWith('5x/'));
  const enPages = pages.filter((d) => d.id.startsWith('en/'));

  const sections: string[] = ['# Express.js — Full Documentation\n'];
  sections.push('> Fast, unopinionated, minimalist web framework for Node.js\n');

  // Process docs
  for (const entry of enDocs) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  // Process API docs
  for (const entry of apiDocs) {
    const url = new URL(`/en/${entry.id}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  // Process pages
  for (const entry of enPages) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  return textResponse(sections.join('\n'));
};
