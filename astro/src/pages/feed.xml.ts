import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  getAuthorsCustomData,
  getPubDateFromId,
  shouldIncludeInFeed,
  sortByIdDateDesc,
} from '@/utils/rss';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog');
  const sortedBlog = sortByIdDateDesc(blog.filter((post) => shouldIncludeInFeed(post.id)));

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
};
