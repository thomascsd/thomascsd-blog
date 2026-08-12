import { DOCUMENT, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { SeoService } from '../../seo/seo.service';
import { buildBlogPostingJsonLd } from '../../seo/structured-data';
import { getDescription, getPostDate, getPostImage } from '../../seo/seo-utils';

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
    <div class="post__image-fullwidth">
      <img class="post__image" [src]="post.attributes.bgImageUrl" [alt]="post.attributes.title" />
    </div>
    <article>
      <header class="post__header">
        <div class="post__date">{{ getDateFromSlug(post.attributes.slug) }}</div>
        <h1 class="post__title">{{ post.attributes.title }}</h1>
      </header>
      <div class="post__content">
        <analog-markdown [content]="post.content" />
      </div>
    </article>
    }
  `,
  styles: `
    :host { display: block; }

    .post__image-fullwidth {
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      margin-bottom: 2.5rem;
      overflow: hidden;
    }

    .post__image {
      width: 100%;
      height: auto;
      max-height: 50vh;
      object-fit: cover;
      display: block;
    }

    article {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .post__header {
      margin-bottom: 2rem;
    }

    .post__date {
      color: var(--muted);
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
    }

    .post__title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 0;
    }

    .post__content {
      line-height: 1.7;
    }
  `,

})
export default class BlogPost {
  readonly post$ = injectContent<PostAttributes>('slug');
  private readonly seo = inject(SeoService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.post$.pipe(takeUntilDestroyed()).subscribe((post) => {
      const attributes = post.attributes;
      const published = getPostDate(attributes);
      const modified = attributes.dateModified?.trim() || published;
      this.seo.update({
        title: `${attributes.title}｜Thomas Blog`,
        description: getDescription(attributes),
        path: `/blog/${attributes.slug}`,
        type: 'article',
        image: getPostImage(attributes),
        publishedTime: published || undefined,
        modifiedTime: modified || undefined,
        author: attributes.author || 'Thomas',
      });
      this.setStructuredData(buildBlogPostingJsonLd(attributes));
    });
  }

  private setStructuredData(data: ReturnType<typeof buildBlogPostingJsonLd>): void {
    this.document.head.querySelector('script[type="application/ld+json"][data-seo="blog-posting"]')?.remove();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'blog-posting');
    script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c');
    this.document.head.appendChild(script);
  }

  getDateFromSlug(slug: string): string {
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }
}
