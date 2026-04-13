import { marked } from 'marked';

export interface Doc {
  slug: string;
  title: string;
  content: string;
}

const globResult = import.meta.glob('../content/docs/*.md', { as: 'raw', eager: true });

export function getDocs(): Doc[] {
  const entries = Object.entries(globResult).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const title = extractTitle(content) || slug;
    return { slug, title, content: marked.parse(content) as string };
  });
  
  return entries.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDocSlugs(): string[] {
  return Object.keys(globResult).map(path => {
    return path.split('/').pop()?.replace('.md', '') || '';
  });
}

function extractTitle(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}
