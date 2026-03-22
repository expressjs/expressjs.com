import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

const getBlockedRobotsTxt = () => `\
User-agent: *
Disallow: /
`;

export const GET: APIRoute = ({ site }) => {
  // Netlify builds should not be indexed.
  if (import.meta.env.DEPLOY_PRIME_URL) {
    return new Response(getBlockedRobotsTxt());
  }

  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};