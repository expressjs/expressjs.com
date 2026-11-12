import fs from 'node:fs/promises';
import matter from 'gray-matter';
import { JSX_ATTRS, signatureMetaToText } from './signature-meta.mjs';

export interface ContentEntry {
  id: string;
  data: { title: string; description?: string };
  filePath?: string;
}

// A fenced code block (``` or ~~~, optionally indented), up to its closing fence.
const FENCED_CODE_BLOCK = /^[ \t]*(`{3,}|~{3,}).*\n[\s\S]*?^[ \t]*\1[`~]*[ \t]*$/gm;
// Private-use character marking where a fenced code block was set aside.
const CODE_BLOCK_MARKER = '\uE000';

export function stripMdxSyntax(content: string): string {
  // Set fenced code blocks aside so code examples keep their `import` lines and
  // JSX-like syntax (e.g. `Array<Item>`).
  const codeBlocks: string[] = [];
  const prose = content.replace(FENCED_CODE_BLOCK, (block) => {
    codeBlocks.push(block);
    return `${CODE_BLOCK_MARKER}${codeBlocks.length - 1}${CODE_BLOCK_MARKER}`;
  });

  return (
    signatureMetaToText(
      // Remove import statements
      prose.replace(/^import\s+.*$/gm, '')
    )
      // Remove JSX self-closing tags like <Alert ... />. `JSX_ATTRS` tolerates `>`
      // inside quoted or braced attribute values (e.g. runtime version constraints).
      .replace(new RegExp(`<[A-Z]\\w*${JSX_ATTRS}\\/>`, 'g'), '')
      // Remove JSX opening and closing tags like <Alert> </Alert>
      .replace(new RegExp(`<\\/?[A-Z]\\w*${JSX_ATTRS}>`, 'g'), '')
      // Clear whitespace-only lines left by removed tags, then collapse blank lines
      .replace(/^[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      // Put the fenced code blocks back unchanged.
      .replace(
        new RegExp(`${CODE_BLOCK_MARKER}(\\d+)${CODE_BLOCK_MARKER}`, 'g'),
        (_, index: string) => codeBlocks[Number(index)]
      )
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
