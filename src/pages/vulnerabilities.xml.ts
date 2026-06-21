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
  const securityPosts = sortByIdDateDesc(
    blog.filter(
      (post) => shouldIncludeInFeed(post.id) && (post.data.tags ?? []).includes('security')
    )
  );

  return rss({
    title: 'Express.js Security Feed',
    description: 'Posts tagged as security from the Express.js blog.',
    site: site.href,
    items: securityPosts.map((post) => ({
      link: `/en/blog/${post.id}/`,
      title: post.data.title,
      pubDate: getPubDateFromId(post.id),
      description: post.data.description,
      content: getLinkedTitleContent(post.data.title, post.id, site),
      categories: post.data.tags,
      customData: getAuthorsCustomData(post.data.authors),
    })),
  });
};
