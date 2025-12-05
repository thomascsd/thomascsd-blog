import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../post-attributes';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <div class="hero-fullwidth">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__media">
          <img ngSrc="/images/bgBlog.png" width="1200" height="400" alt="Blog banner image" priority />
        </div>
      </section>
    </div>
    <div class="hero__content">
      <h1 id="hero-title">簡約現代的技術部落格</h1>
      <p class="muted">分享程式設計、工具與開發心得，保持持續學習。</p>
    </div>

    <section aria-labelledby="articles-title">
      <h2 id="articles-title">全部文章</h2>
      <div class="list">
        @for (post of posts; track post.attributes.slug) {
          <article>
            <h2 class="post__title">
              <a [routerLink]="['/blog', post.attributes.slug]">{{ post.attributes.title }}</a>
            </h2>
            <div class="post__date">{{ getDateFromSlug(post.attributes.slug) }}</div>
            <p class="post__desc">{{ post.attributes.description }}</p>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    .muted { color: var(--muted); }

    .hero-fullwidth {
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      margin-bottom: 2rem;
    }

    .hero {
      width: 100%;
    }

    .hero__media {
      width: 100%;
      display: flex;
    }

    .hero__media img {
      width: 100%;
      height: auto;
      aspect-ratio: 16/5;
      object-fit: cover;
      display: block;
    }

    .hero__content {
      text-align: center;
      margin-bottom: 2.5rem;
      padding: 0 1rem;
    }

    .hero__content h1 {
      margin: 0 0 0.5rem;
    }


    .list { display: grid; gap: 1.5rem; }
    article {
      padding: 1.2rem;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: color-mix(in oklab, var(--bg) 95%, transparent);
    }
    .post__title {
      margin: 0 0 0.25rem;
      font-size: 2.1rem;
      font-weight: 700;
      line-height: 1.18;
    }
    .post__date {
      color: var(--muted);
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
      margin-left: 0.1em;
    }
    .post__desc { margin: 0; color: var(--muted); }

    @media (min-width: 768px) {
      .hero__media img {
        aspect-ratio: 16/5;
      }
    }

    @media (max-width: 600px) {
      .hero__media img {
        aspect-ratio: 16/7;
      }
    }
  `,
})
export default class HomePage {
  readonly posts = injectContentFiles<PostAttributes>()
    .slice()
    .sort((a, b) => {
      // 以 slug 前綴 yyyy-mm-dd 字串比較，desc
      const as = a.attributes.slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
      const bs = b.attributes.slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (!as || !bs) return 0;
      // 字串比較即可，因格式固定
      return bs[0].localeCompare(as[0]);
    });

  getDateFromSlug(slug: string): string {
    // 假設 slug 格式為 yyyy-mm-dd-xxxx
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }
}
