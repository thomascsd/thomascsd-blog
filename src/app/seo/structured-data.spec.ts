import { describe, expect, it } from 'vitest';
import { buildBlogPostingJsonLd } from './structured-data';

describe('BlogPosting JSON-LD', () => {
  it('builds schema data from article fields and canonical URL', () => {
    const data = buildBlogPostingJsonLd({
      title: 'Angular SSR', slug: '2026-04-01-angular-ssr',
      description: 'SSR notes', bgImageUrl: '/images/angular.png',
      datePublished: '2026-04-01', dateModified: '2026-04-02', author: 'Thomas',
    });
    expect(data).toMatchObject({
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: 'Angular SSR', description: 'SSR notes', datePublished: '2026-04-01',
      dateModified: '2026-04-02', author: { '@type': 'Person', name: 'Thomas' },
      mainEntityOfPage: { '@id': 'https://thomascsd.github.io/blog/2026-04-01-angular-ssr/' },
      image: 'https://thomascsd.github.io/images/angular.png',
    });
    expect(JSON.parse(JSON.stringify(data))).toEqual(data);
  });

  it('uses deterministic fallbacks for optional article SEO fields', () => {
    const data = buildBlogPostingJsonLd({ title: 'Notes', slug: '2026-04-03-notes' });
    expect(data.datePublished).toBe('2026-04-03');
    expect(data.dateModified).toBe('2026-04-03');
    expect(data.author.name).toBe('Thomas');
    expect(data.image).toBe('https://thomascsd.github.io/images/bgBlog.png');
    expect(data.description).not.toBe('');
  });
});

void buildBlogPostingJsonLd;
