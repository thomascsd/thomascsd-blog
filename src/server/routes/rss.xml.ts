import { defineEventHandler, setHeader } from 'h3';
import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';
import { Feed } from 'feed';

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: "Thomas Blog",
    description: "Thomas Blog RSS Feed",
    id: "https://thomascsd.github.io/",
    link: "https://thomascsd.github.io/",
    language: "zh-TW",
    copyright: "All rights reserved, Thomas",
    updated: new Date(),
    generator: "Feed for Node.js",
  });

  const contentDir = path.resolve(process.cwd(), 'src/content');
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = fm<any>(fileContent);
      const attrs = parsed.attributes;

      const slug = attrs.slug || file.replace('.md', '');
      const url = `https://thomascsd.github.io/blog/${slug}`;

      // Extract date from filename YYYY-MM-DD
      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? new Date(dateMatch[1]) : new Date();

      feed.addItem({
        title: attrs.title || file,
        id: url,
        link: url,
        description: attrs.description || '',
        content: parsed.body,
        date: date,
      });
    }
  }

  setHeader(event, 'Content-Type', 'text/xml');
  return feed.rss2();
});
