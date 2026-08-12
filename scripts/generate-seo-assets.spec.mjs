import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRobots, buildSitemap, collectSeoEntries } from './generate-seo-assets.mjs';

const posts = [
  { file: '2026-04-02-second.md', attributes: { title: 'Second', slug: '2026-04-02-second', tags: ['typescript', 'nodejs'], datePublished: '2026-04-02' } },
  { file: '2026-04-01-first.md', attributes: { title: 'First', slug: '2026-04-01-first', tags: ['typescript'], dateModified: '2026-04-03' } },
];

test('collects canonical site, article, and unique non-empty tag routes', () => {
  const entries = collectSeoEntries(posts);
  const urls = entries.map((entry) => entry.loc);
  assert.deepEqual(urls, [
    'https://thomascsd.github.io/',
    'https://thomascsd.github.io/about/',
    'https://thomascsd.github.io/tags/',
    'https://thomascsd.github.io/blog/2026-04-01-first/',
    'https://thomascsd.github.io/blog/2026-04-02-second/',
    'https://thomascsd.github.io/tags/nodejs/',
    'https://thomascsd.github.io/tags/typescript/',
  ]);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => url.startsWith('https://thomascsd.github.io/')));
  assert.equal(entries.find((entry) => entry.loc.includes('first'))?.lastmod, '2026-04-03');
});

test('renders parseable sitemap XML and robots policy', () => {
  const xml = buildSitemap(collectSeoEntries(posts));
  assert.match(xml, /^<\?xml/);
  assert.match(xml, /<urlset[^>]+>/);
  assert.match(xml, /<loc>https:\/\/thomascsd\.github\.io\/about\/<\/loc>/);
  assert.match(xml, /<lastmod>2026-04-03<\/lastmod>/);
  assert.doesNotMatch(xml, /localhost|preview/);
  const robots = buildRobots();
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/thomascsd\.github\.io\/sitemap\.xml$/m);
});
