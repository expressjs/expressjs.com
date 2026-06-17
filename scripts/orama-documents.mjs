import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, extname, basename } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

const CONTENT_DIR = fileURLToPath(new URL('../src/content', import.meta.url));

const stripMdxImports = (content) => content.replace(/^import\s+.*$/gm, '');

const mdToText = (content) =>
  toString(fromMarkdown(stripMdxImports(content))).replace(/<[^>]*>/g, '');

// Build the public path segment from a content-relative file path: drop the
// extension and any trailing `index` so `foo/index.mdx` -> `foo`. This matches
// Astro's glob loader, which serves index files at their directory URL (without
// a trailing `/index`).
const toPathSegment = (relPath) =>
  relPath.replace(/\.mdx?$/, '').replace(/(?:^|\/)index$/, '');

const collectMdFiles = async (dir, base = dir) => {
  const entries = await readdir(dir);
  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry);
      const info = await stat(fullPath);
      if (info.isDirectory()) return collectMdFiles(fullPath, base);
      if (extname(entry) === '.md' || extname(entry) === '.mdx') return [relative(base, fullPath)];
      return [];
    })
  );
  return results.flat();
};

export const getPages = async (lang) => {
  const baseDir = join(CONTENT_DIR, `pages/${lang}`);
  const mdFiles = await collectMdFiles(baseDir);

  return Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = join(baseDir, file);
      const raw = await readFile(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const pathSegment = toPathSegment(relative(baseDir, fullPath));
      const isResource = pathSegment.startsWith('resources');

      return {
        title: data.title ?? basename(file).replace(/\.mdx?$/, ''),
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/${pathSegment}`.replace(/\/+$/, ''),
        category: isResource ? 'menu.main.resources' : 'menu.main.docs',
      };
    })
  );
};

export const getDocs = async (lang) => {
  const baseDir = join(CONTENT_DIR, `docs/${lang}/5x`);
  const mdFiles = await collectMdFiles(baseDir);

  return Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = join(baseDir, file);
      const raw = await readFile(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const pathSegment = toPathSegment(relative(baseDir, fullPath));

      return {
        title: data.title ?? basename(file).replace(/\.mdx?$/, ''),
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/${pathSegment}`.replace(/\/+$/, ''),
        category: 'menu.main.docs',
      };
    })
  );
};

export const getBlogPosts = async (lang) => {
  const baseDir = join(CONTENT_DIR, `blog`);
  const mdFiles = await collectMdFiles(baseDir);

  return Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = join(baseDir, file);
      const raw = await readFile(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = basename(file).replace(/\.mdx?$/, '');

      return {
        title: data.title ?? slug,
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/blog/${slug}`,
        category: 'menu.main.blog',
      };
    })
  );
};

const VERSIONS = /** @type {const} */ (['5x', '4x', '3x']);

export const getApi = async (lang) => {
  const results = await Promise.all(
    VERSIONS.map(async (version) => {
      const baseDir = join(CONTENT_DIR, `api/${version}`);
      const mdFiles = await collectMdFiles(baseDir);

      return Promise.all(
        mdFiles.map(async (file) => {
          const fullPath = join(baseDir, file);
          const raw = await readFile(fullPath, 'utf-8');
          const { data, content } = matter(raw);
          const pathSegment = toPathSegment(relative(baseDir, fullPath));

          return {
            title: data.title ?? basename(file).replace(/\.mdx?$/, ''),
            description: data.description ?? '',
            content: mdToText(content),
            path: `/${lang}/${version}/${pathSegment}`.replace(/\/+$/, ''),
            category: 'menu.main.api',
            version,
          };
        })
      );
    })
  );

  return results.flat();
};

export const getAllDocuments = async (lang) => {
  const [docs, api, pages, blog] = await Promise.all([
    getDocs(lang),
    getApi(lang),
    getPages(lang),
    getBlogPosts(lang),
  ]);
  return [...docs, ...api, ...pages, ...blog];
};
