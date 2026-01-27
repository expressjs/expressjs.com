import { getCollection, type CollectionEntry } from 'astro:content';
import type { MenuSection } from '@config/menu';

export type DocEntry = CollectionEntry<'docs'>;

/**
 * Get all documents for a specific language
 */
export async function getDocsByLang(lang: string = 'en') {
  const allDocs = await getCollection('docs');
  return allDocs.filter((doc) => doc.id.startsWith(`${lang}/`));
}

/**
 * Get all documents for a specific section and language
 */
export async function getDocsBySection(section: MenuSection, lang: string = 'en') {
  const allDocs = await getDocsByLang(lang);
  return allDocs
    .filter((doc) => doc.data.menu === section)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/**
 * Get a single document by path
 */
export async function getDocByPath(path: string) {
  const allDocs = await getCollection('docs');
  return allDocs.find((doc) => doc.id === path);
}

/**
 * Generate breadcrumb from doc path
 */
export function generateBreadcrumb(id: string) {
  const parts = id.split('/');
  const breadcrumb: { label: string; href?: string }[] = [];

  let currentPath = '';
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      // Last part (filename without extension)
      const slug = part.replace(/\.mdx?$/, '');
      breadcrumb.push({ label: slug });
    } else {
      // Path segments
      currentPath += (currentPath ? '/' : '') + part;
      breadcrumb.push({
        label: part,
        href: `/${currentPath}`
      });
    }
  });

  return breadcrumb;
}

/**
 * Get navigation items for a section
 */
export async function getSectionNav(section: MenuSection, lang: string = 'en') {
  const docs = await getDocsBySection(section, lang);

  return docs.map((doc) => {
    const slug = doc.id.replace(`${lang}/${section}/`, '').replace(/\.mdx?$/, '');
    return {
      title: doc.data.title,
      slug,
      href: `/${lang}/${section}/${slug}`,
      order: doc.data.order ?? 0,
    };
  });
}
