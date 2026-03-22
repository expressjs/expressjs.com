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
  const securityPosts = sortByIdDateDesc(
    blog.filter(
      (post) => shouldIncludeInFeed(post.id) && (post.data.tags ?? []).includes('security')
    )
  );

  return rss({
    title: 'Express.js Security Feed',
    description: 'Posts tagged as security from the Express.js blog.',
    site: (context.site as URL).href,
    items: securityPosts.map((post) => ({
      title: post.data.title,
      pubDate: getPubDateFromId(post.id),
      description: post.data.description,
      categories: post.data.tags,
      customData: getAuthorsCustomData(post.data.authors),
      link: `/blog/${post.id}/`,
    })),
  });
};
