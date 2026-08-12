import { defineEventHandler, setHeader } from 'h3';
import * as fs from 'node:fs';
import * as path from 'node:path';
import fm from 'front-matter';

const SITE_URL = 'https://thomascsd.github.io';
const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export default defineEventHandler((event) => {
  const contentDir = path.resolve(process.cwd(), 'src/content');
  const items: string[] = [];
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md')).sort().reverse();
    for (const file of files) {
      const parsed = fm<Record<string, string>>(fs.readFileSync(path.join(contentDir, file), 'utf8'));
      const attrs = parsed.attributes;
      const slug = String(attrs.slug || file.replace('.md', '')).replace(/\/+$/, '');
      const url = `${SITE_URL}/blog/${slug}/`;
      const date = attrs.datePublished || file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '';
      items.push(`    <item>\n      <title>${escapeXml(attrs.title || file)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <description>${escapeXml(attrs.description || '')}</description>${date ? `\n      <pubDate>${new Date(`${date}T00:00:00Z`).toUTCString()}</pubDate>` : ''}\n    </item>`);
    }
  }
  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n  <title>Thomas Blog</title>\n  <description>Thomas Blog RSS Feed</description>\n  <link>${SITE_URL}/</link>\n  <language>zh-TW</language>\n${items.join('\n')}\n</channel></rss>\n`;
});

void defineEventHandler;
void setHeader;
void fm;
