export interface FeedAuthor {
  name: string;
  github?: string;
}

export interface DatedPost {
  id: string;
  data?: { date?: Date | string };
}

export function getPubDateFromId(id: string): Date | undefined {
  const filename = id.split('/').pop() ?? id;
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) return undefined;

  const date = new Date(`${match[1]}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Resolves a post's publication date, preferring the `date` front matter field
 * and falling back to the `YYYY-MM-DD` prefix in the filename.
 */
export function getPubDate(post: DatedPost): Date | undefined {
  const frontmatter = post.data?.date;
  if (frontmatter) {
    const date = frontmatter instanceof Date ? frontmatter : new Date(frontmatter);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return getPubDateFromId(post.id);
}

/**
 * Formats a post's publication date for display. Calendar dates are formatted in
 * UTC so the rendered day matches the authored date regardless of the viewer's
 * timezone. Returns undefined when no valid date can be resolved.
 */
export function formatPubDate(
  post: DatedPost,
  options: Intl.DateTimeFormatOptions
): string | undefined {
  const date = getPubDate(post);
  return date?.toLocaleDateString('en-US', { timeZone: 'UTC', ...options });
}

export function getAuthorsCustomData(authors?: FeedAuthor[]): string | undefined {
  if (!authors?.length) return undefined;

  return authors
    .map((author) => {
      const uri = author.github ? `<uri>https://github.com/${author.github}</uri>` : '';
      return `<author><name>${author.name}</name>${uri}</author>`;
    })
    .join('');
}

export function sortByPubDateDesc<T extends DatedPost>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = getPubDate(a)?.getTime() ?? 0;
    const bTime = getPubDate(b)?.getTime() ?? 0;

    if (aTime === bTime) return a.id.localeCompare(b.id);
    return bTime - aTime;
  });
}

export function shouldIncludeInFeed(id: string): boolean {
  const filename = id.split('/').pop() ?? id;
  return !/^write[-_]posts?$/i.test(filename);
}

export function getLinkedTitleContent(title: string, id: string, site: URL): string {
  const link = new URL(`/en/blog/${id}/`, site).href;

  return `<a href="${link}">${title}</a>`;
}
