import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../post-attributes';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media">
        <img ngSrc="/images/bgBlog.png" width="1200" height="400" alt="Blog banner image" priority />
      </div>
      <div class="hero__content">
        <h1 id="hero-title">簡約現代的技術部落格</h1>
        <p class="muted">分享程式設計、工具與開發心得，保持持續學習。</p>
      </div>
    </section>

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


    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
    }

    .hero__media {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero__media img {
      width: 100%;
      max-width: 1100px;
      height: auto;
      aspect-ratio: 11/4;
      border-radius: 18px;
      border: 1px solid var(--border);
      object-fit: cover;
      box-shadow: 0 4px 32px 0 rgb(0 0 0 / 7%);
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
      .hero {
        flex-direction: column;
        gap: 2.5rem;
      }
      .hero__media img {
        max-width: 1100px;
        aspect-ratio: 11/4;
      }
    }

    @media (max-width: 600px) {
      .hero__media img {
        max-width: 100vw;
        aspect-ratio: 16/9;
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
