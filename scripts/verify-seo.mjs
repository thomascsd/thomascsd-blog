import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const publicDir = resolve(process.argv[2] || 'dist/analog/public');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

async function findHtml(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await findHtml(path));
    else if (entry.name === 'index.html') result.push(path);
  }
  return result;
}

function inspectHtml(html, file) {
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1];
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)?.[1];
  check(Boolean(title), `${file}: missing title`);
  check(Boolean(description), `${file}: missing description`);
  check(Boolean(canonical?.startsWith('https://thomascsd.github.io/')), `${file}: invalid canonical`);
  check((html.match(/name="description"/g) || []).length === 1, `${file}: duplicate descriptions`);
  return { title, canonical };
}

const sitemap = await readFile(join(publicDir, 'sitemap.xml'), 'utf8');
const robots = await readFile(join(publicDir, 'robots.txt'), 'utf8');
check(sitemap.includes('<urlset'), 'sitemap is not XML urlset');
check(!/localhost|127\.0\.0\.1|preview/i.test(sitemap), 'sitemap contains non-production host');
check(robots.includes('Allow: /'), 'robots missing Allow: /');
check(robots.includes('Sitemap: https://thomascsd.github.io/sitemap.xml'), 'robots missing sitemap URL');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(new Set(urls).size === urls.length, 'sitemap contains duplicate URLs');
check(urls.every((url) => url.endsWith('/') && url.startsWith('https://thomascsd.github.io/')), 'sitemap URL normalization failed');

const htmlFiles = await findHtml(publicDir);
check(htmlFiles.length > 0, 'no prerendered HTML found');
for (const file of htmlFiles) inspectHtml(await readFile(file, 'utf8'), file);
const articleFiles = htmlFiles.filter((file) => {
  const relative = file.slice(publicDir.length + 1).split(/[\\/]/);
  return relative[0] === 'blog' && relative.length > 2;
});
for (const file of articleFiles) {
  const html = await readFile(file, 'utf8');
  const scripts = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  check(scripts.some((match) => { try { return JSON.parse(match[1])['@type'] === 'BlogPosting'; } catch { return false; } }), `${file}: missing BlogPosting JSON-LD`);
}

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join('\n'));
  process.exit(1);
}
console.log(`SEO verifier PASS: ${htmlFiles.length} prerendered pages, ${urls.length} sitemap URLs`);
