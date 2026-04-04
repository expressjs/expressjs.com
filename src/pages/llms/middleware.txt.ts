import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRawMarkdown, buildSection, textResponse } from '@/utils/llms';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site as URL;

  const pages = await getCollection('pages');
  const middleware = pages.filter((d) => d.id.startsWith('en/resources/middleware/'));

  const sections: string[] = ['# Express.js — Official Middleware\n'];
  sections.push('> Official middleware modules maintained by the Express.js team.\n');

  for (const entry of middleware) {
    const slug = entry.id.replace('en/', '');
    const url = new URL(`/en/${slug}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  return textResponse(sections.join('\n'));
};
