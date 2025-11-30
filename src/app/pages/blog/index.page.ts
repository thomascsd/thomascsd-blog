import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <section aria-labelledby="blog-title">
      <h1 id="blog-title">Blog</h1>
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
    .list { display: grid; gap: 1.5rem; }
    article { padding: 1.2rem; border: 1px solid var(--border); border-radius: 10px; }
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
  `,
})
export default class Blog {
  readonly posts = injectContentFiles<PostAttributes>();

  getDateFromSlug(slug: string): string {
    // 假設 slug 格式為 yyyy-mm-dd-xxxx
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }
}
