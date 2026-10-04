import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  getDescription,
  getPostDate,
  formatTag,
} from './seo-utils';

describe('SEO utilities', () => {
  it('builds canonical URLs with one trailing slash', () => {
    expect(absoluteUrl('/')).toBe('https://thomascsd.github.io/');
    expect(absoluteUrl('/about')).toBe('https://thomascsd.github.io/about/');
    expect(absoluteUrl('/blog/example/')).toBe('https://thomascsd.github.io/blog/example/');
  });

  it('prefers explicit post dates and falls back to the slug date', () => {
    expect(getPostDate({ slug: '2026-03-29-example', datePublished: '2026-04-01' })).toBe('2026-04-01');
    expect(getPostDate({ slug: '2026-03-29-example' })).toBe('2026-03-29');
  });

  it('returns a deterministic non-empty description', () => {
    expect(getDescription({ title: 'Example', description: '  A useful summary.  ' })).toBe('A useful summary.');
    expect(getDescription({ title: 'Example', description: '' })).toBe('閱讀 Thomas Blog 的技術文章：Example。');
  });

  it('formats known and unknown tag names', () => {
    expect(formatTag('typescript')).toBe('TypeScript');
    expect(formatTag('expressjs')).toBe('Express.js');
    expect(formatTag('dotnet')).toBe('.NET');
    expect(formatTag('unknown-tag')).toBe('Unknown Tag');
  });
});
