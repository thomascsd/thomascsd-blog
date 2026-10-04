import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SeoService] });
    document.head.innerHTML = '';
  });

  it('writes page metadata and canonical URL', () => {
    TestBed.inject(SeoService).update({
      title: 'Example｜Thomas Blog',
      description: 'Example description',
      path: '/blog/example',
    });

    expect(TestBed.inject(Title).getTitle()).toBe('Example｜Thomas Blog');
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Example description');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://thomascsd.github.io/blog/example/');
    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
    expect(document.head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
  });

  it('updates metadata without duplicating tags', () => {
    const service = TestBed.inject(SeoService);
    const data = { title: 'A', description: 'B', path: '/a' };
    service.update(data);
    service.update({ ...data, title: 'C' });

    expect(document.head.querySelectorAll('meta[name="description"]').length).toBe(1);
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('C');
  });

  it('writes article metadata', () => {
    TestBed.inject(SeoService).update({
      title: 'Article｜Thomas Blog',
      description: 'Article description',
      path: '/blog/article',
      type: 'article',
      publishedTime: '2026-03-29',
      modifiedTime: '2026-03-29',
      author: 'Thomas',
    });

    expect(document.head.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
    expect(document.head.querySelector('meta[property="article:author"]')?.getAttribute('content')).toBe('Thomas');
  });
});

void Meta;
