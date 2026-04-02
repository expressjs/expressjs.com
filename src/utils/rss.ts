export interface FeedAuthor {
  name: string;
  github?: string;
}

export function getPubDateFromId(id: string): Date | undefined {
  const filename = id.split('/').pop() ?? id;
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!match) return undefined;

  const date = new Date(`${match[1]}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
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

export function sortByIdDateDesc<T extends { id: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aTime = getPubDateFromId(a.id)?.getTime() ?? 0;
    const bTime = getPubDateFromId(b.id)?.getTime() ?? 0;

    if (aTime === bTime) return a.id.localeCompare(b.id);
    return bTime - aTime;
  });
}

export function shouldIncludeInFeed(id: string): boolean {
  const filename = id.split('/').pop() ?? id;
  return !/^write[-_]posts?$/i.test(filename);
}

export function getLinkedTitleContent(title: string, id: string, site: URL): string {
  const link = new URL(`/blog/${id}/`, site).href;

  return `<a href="${link}">${title}</a>`;
}
