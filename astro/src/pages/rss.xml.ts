import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

function getPubDateFromId(id: string): Date | undefined {
  const filename = id.split('/').pop() ?? id;
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) return undefined;

  const date = new Date(`${match[1]}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function getAuthorsCustomData(
  authors?: Array<{ name: string; github?: string }>
): string | undefined {
  if (!authors?.length) return undefined;

  return authors
    .map((author) => {
      const uri = author.github ? `<uri>https://github.com/${author.github}</uri>` : '';
      return `<author><name>${author.name}</name>${uri}</author>`;
    })
    .join('');
}

export const GET: APIRoute = async(context) => {
  const blog = await getCollection('blog');
  const sortedBlog = [...blog].sort((a, b) => {
    const aTime = getPubDateFromId(a.id)?.getTime() ?? 0;
    const bTime = getPubDateFromId(b.id)?.getTime() ?? 0;

    if (aTime === bTime) return a.id.localeCompare(b.id);
    return bTime - aTime;
  });

  return rss({
    title: 'The Express.js Blog',
    description: 'News and updates about express.js',
    site: (context.site as URL).href,
    items: sortedBlog.map((post) => ({
      title: post.data.title,
      pubDate: getPubDateFromId(post.id),
      description: post.data.description,
      categories: post.data.tags,
      customData: getAuthorsCustomData(post.data.authors),
      link: `/blog/${post.id}/`,
    })),
  });
}