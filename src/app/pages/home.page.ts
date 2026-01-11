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
      <h1 id="hero-title">Thomas Blog</h1>
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
            @if (post.attributes.tags?.length) {
              <div class="post__tags">
                @for (tag of post.attributes.tags; track tag) {
                  <a [routerLink]="['/tags', tag]" class="tag">{{ formatTag(tag) }}</a>
                }
              </div>
            }
            <a [routerLink]="['/blog', post.attributes.slug]" class="read-more">Read More →</a>
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
    .post__title a {
      color: var(--text);
      text-decoration: none;
      transition: color 0.2s;
    }
    .post__title a:hover {
      color: var(--link);
    }
    .post__date {
      color: var(--muted);
      font-size: 1.15rem;
      margin-bottom: 0.5rem;
      margin-left: 0.1em;
    }
    .post__desc { margin: 0; color: var(--muted); }
    .post__tags {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .tag {
      font-size: 0.9rem;
      padding: 0.2rem 0.6rem;
      background-color: var(--border);
      border-radius: 4px;
      text-decoration: none;
      color: var(--text);
      transition: background-color 0.2s;
    }
    .tag:hover {
      background-color: var(--muted);
      color: white;
    }

    .read-more {
      display: inline-block;
      margin-top: 1rem;
      color: var(--link);
      font-weight: 500;
      text-decoration: none;
    }
    .read-more:hover {
      text-decoration: underline;
    }

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

  formatTag(tag: string): string {
    return tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
  }
}
