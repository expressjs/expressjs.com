import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  getLinkedTitleContent,
  getAuthorsCustomData,
  getPubDateFromId,
  shouldIncludeInFeed,
  sortByIdDateDesc,
} from '@/utils/rss';

export const GET: APIRoute = async (context) => {
  const site = context.site as URL;
  const blog = await getCollection('blog');
  const sortedBlog = sortByIdDateDesc(blog.filter((post) => shouldIncludeInFeed(post.id)));

  return rss({
    title: 'The Express.js Blog',
    description: 'News and updates about express.js',
    site: site.href,
    items: sortedBlog.map((post) => ({
      link: `/blog/${post.id}/`,
      title: post.data.title,
      pubDate: getPubDateFromId(post.id),
      description: post.data.description,
      content: getLinkedTitleContent(post.data.title, post.id, site),
      categories: post.data.tags,
      customData: getAuthorsCustomData(post.data.authors),
    })),
  });
};
