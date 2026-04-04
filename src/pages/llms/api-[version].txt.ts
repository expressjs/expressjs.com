import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getRawMarkdown, buildSection, textResponse } from '@/utils/llms';

export async function getStaticPaths() {
  const api = await getCollection('api');
  const versions = [...new Set(api.map((d) => d.id.split('/')[0]))];
  return versions.map((version) => ({ params: { version } }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const siteUrl = site as URL;
  const version = params.version as string;
  const label = `v${version.replace('x', '')}`;

  const api = await getCollection('api');
  const apiDocs = api.filter((d) => d.id.startsWith(`${version}/`));

  const sections: string[] = [`# Express.js — API Reference (${label})\n`];
  sections.push('> Fast, unopinionated, minimalist web framework for Node.js\n');

  for (const entry of apiDocs) {
    const url = new URL(`/en/${entry.id}`, siteUrl).href;
    const content = await getRawMarkdown(entry);
    if (content) {
      sections.push(buildSection(entry.data.title, url, content));
    }
  }

  return textResponse(sections.join('\n'));
};
