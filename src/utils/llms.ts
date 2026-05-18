import fs from 'node:fs/promises';
import matter from 'gray-matter';

export interface ContentEntry {
  id: string;
  data: { title: string; description?: string };
  filePath?: string;
}

export function stripMdxSyntax(content: string): string {
  return (
    content
      // Remove import statements
      .replace(/^import\s+.*$/gm, '')
      // Remove JSX self-closing tags like <Alert ... />
      .replace(/<[A-Z]\w*\s*[^>]*\/>/g, '')
      // Remove JSX opening and closing tags like <Alert> </Alert>
      .replace(/<\/?[A-Z]\w*[^>]*>/g, '')
      // Collapse multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export async function getRawMarkdown(entry: ContentEntry): Promise<string> {
  if (!entry.filePath) return '';
  try {
    const raw = await fs.readFile(entry.filePath, 'utf-8');
    const { content } = matter(raw);
    return stripMdxSyntax(content);
  } catch {
    return '';
  }
}

export function buildSection(title: string, url: string, content: string): string {
  return `\n---\n\n## ${title}\n\nURL: ${url}\n\n${content}`;
}

export function textResponse(body: string): Response {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
