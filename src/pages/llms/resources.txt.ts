import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRawMarkdown, buildSection, textResponse } from '@/utils/llms';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site as URL;

  const pages = await getCollection('pages');
  const resources = pages.filter(
    (d) => d.id.startsWith('en/resources/') && !d.id.includes('/middleware/')
  );

  const sections: string[] = ['# Express.js — Resources\n'];
  sections.push('> Community resources, tools, and utilities for Express.js.\n');

  for (const entry of resources) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  return textResponse(sections.join('\n'));
};
