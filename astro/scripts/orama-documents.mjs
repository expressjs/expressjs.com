import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, extname, basename } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import matter from 'gray-matter';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

const CONTENT_DIR = fileURLToPath(new URL('../src/content', import.meta.url));

const mdToText = (content) => toString(fromMarkdown(content)).replace(/<[^>]*>/g, '');

const collectMdFiles = async (dir, base = dir) => {
  const entries = await readdir(dir);
  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry);
      const info = await stat(fullPath);
      if (info.isDirectory()) return collectMdFiles(fullPath, base);
      if (extname(entry) === '.md') return [relative(base, fullPath)];
      return [];
    })
  );
  return results.flat();
};

export const getResources = async (lang) => {
  const baseDir = join(CONTENT_DIR, `resources/${lang}`);
  const mdFiles = await collectMdFiles(baseDir);

  return Promise.all(
    mdFiles.map(async (file) => {
      const fullPath = join(baseDir, file);
      const raw = await readFile(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const pathSegment = relative(baseDir, fullPath).replace(/\.md$/, '');

      return {
        title: data.title ?? basename(file, '.md'),
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/resources/${pathSegment}`,
        category: 'menu.resources',
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
      const pathSegment = relative(baseDir, fullPath).replace(/\.md$/, '');

      return {
        title: data.title ?? basename(file, '.md'),
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/${pathSegment}`,
        category: 'menu.docs',
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
      const slug = basename(file, '.md');

      return {
        title: data.title ?? slug,
        description: data.description ?? '',
        content: mdToText(content),
        path: `/${lang}/blog/${slug}`,
        category: 'menu.blog',
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
          const pathSegment = relative(baseDir, fullPath).replace(/\.md$/, '');

          return {
            title: data.title ?? basename(file, '.md'),
            description: data.description ?? '',
            content: mdToText(content),
            path: `/${lang}/${version}/${pathSegment}`,
            category: 'menu.api',
            version,
          };
        })
      );
    })
  );

  return results.flat();
};

export const getAllDocuments = async (lang) => {
  const [docs, api, resources, blog] = await Promise.all([
    getDocs(lang),
    getApi(lang),
    getResources(lang),
    getBlogPosts(lang),
  ]);
  return [...docs, ...api, ...resources, ...blog];
};
