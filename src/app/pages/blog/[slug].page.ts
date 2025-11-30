import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

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

  getDateFromSlug(slug: string): string {
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }
}
