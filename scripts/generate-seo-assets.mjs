import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import fm from 'front-matter';

export const SITE_URL = 'https://thomascsd.github.io';

export function absoluteUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const [pathname, query = ''] = normalized.split('?', 2);
  const trailing = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return `${SITE_URL}${trailing}${query ? `?${query}` : ''}`;
}

function postDate(post) {
  return String(post.attributes.dateModified || post.attributes.datePublished || post.file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || '').trim();
}

export function collectSeoEntries(posts) {
  const entries = [
    { loc: absoluteUrl('/'), priority: '1.0' },
    { loc: absoluteUrl('/about') },
    { loc: absoluteUrl('/tags') },
  ];
  const tags = new Set();
  [...posts].sort((a, b) => String(a.attributes.slug).localeCompare(String(b.attributes.slug))).forEach((post) => {
    const slug = String(post.attributes.slug || post.file.replace(/\.md$/, ''));
    const lastmod = postDate(post);
    entries.push({ loc: absoluteUrl(`/blog/${slug}`), ...(lastmod ? { lastmod } : {}) });
    for (const tag of post.attributes.tags || []) if (String(tag).trim()) tags.add(String(tag).trim());
  });
  [...tags].sort().forEach((tag) => entries.push({ loc: absoluteUrl(`/tags/${tag}`) }));
  return entries;
}

function xmlEscape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function buildSitemap(entries) {
  const urls = [...new Map(entries.map((entry) => [entry.loc, entry])).values()];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((entry) => `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>${entry.lastmod ? `\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : ''}${entry.priority ? `\n    <priority>${entry.priority}</priority>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;
}

export function buildRobots() {
  return `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export async function readPosts(contentDir = resolve('src/content')) {
  const files = (await readdir(contentDir)).filter((file) => file.endsWith('.md')).sort();
  return Promise.all(files.map(async (file) => ({ file, attributes: fm(await readFile(join(contentDir, file), 'utf8')).attributes })));
}

export async function getPrerenderRoutes(contentDir = resolve('src/content')) {
  const posts = await readPosts(contentDir);
  const routes = new Set(['/blog']);
  for (const post of posts) {
    routes.add(`/blog/${post.attributes.slug || post.file.replace(/\.md$/, '')}`);
    for (const tag of post.attributes.tags || []) if (String(tag).trim()) routes.add(`/tags/${String(tag).trim()}`);
  }
  return [...routes].sort();
}

export async function generateSeoAssets({ contentDir = resolve('src/content'), publicDir = resolve('public') } = {}) {
  const posts = await readPosts(contentDir);
  await mkdir(publicDir, { recursive: true });
  await writeFile(join(publicDir, 'robots.txt'), buildRobots(), 'utf8');
  await writeFile(join(publicDir, 'sitemap.xml'), buildSitemap(collectSeoEntries(posts)), 'utf8');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await generateSeoAssets();
