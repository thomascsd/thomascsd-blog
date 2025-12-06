import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-tag-detail',
  imports: [RouterLink, AsyncPipe],
  template: `
    @if (tag$ | async; as tag) {
      <div class="container">
        <header>
          <h1>Tag: {{ formatTag(tag) }}</h1>
          <a routerLink="/tags" class="back-link">← All Tags</a>
        </header>
        
        <div class="list">
          @for (post of getPostsByTag(tag); track post.attributes.slug) {
            <article>
              <h2 class="post__title">
                <a [routerLink]="['/blog', post.attributes.slug]">{{ post.attributes.title }}</a>
              </h2>
              <div class="post__date">{{ getDateFromSlug(post.attributes.slug) }}</div>
              <p class="post__desc">{{ post.attributes.description }}</p>
              @if (post.attributes.tags?.length) {
                <div class="post__tags">
                  @for (t of post.attributes.tags; track t) {
                    <a [routerLink]="['/tags', t]" class="tag">{{ formatTag(t) }}</a>
                  }
                </div>
              }
            </article>
          }
        </div>
      </div>
    }
  `,
  styles: `
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1rem;
    }
    
    h1 { margin: 0; }

    .back-link {
      color: var(--text);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 0.9rem;
    }
    .back-link:hover {
      background-color: var(--muted);
      color: white;
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
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.18;
    }
    .post__title a {
        text-decoration: none;
        color: inherit;
    }
    .post__title a:hover {
        text-decoration: underline;
    }
    .post__date {
      color: var(--muted);
      font-size: 1.05rem;
      margin-bottom: 0.5rem;
    }
    .post__desc { margin: 0; color: var(--muted); }
    
    .post__tags {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .tag {
      font-size: 0.85rem;
      padding: 0.2rem 0.5rem;
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
  `
})
export default class TagDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly allPosts = injectContentFiles<PostAttributes>();
  
  readonly tag$ = this.route.paramMap.pipe(
    map(params => params.get('slug'))
  );

  getPostsByTag(tag: string) {
    return this.allPosts
      .filter(post => post.attributes.tags?.includes(tag))
      .sort((a, b) => {
         const as = a.attributes.slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
         const bs = b.attributes.slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
         if (!as || !bs) return 0;
         return bs[0].localeCompare(as[0]);
      });
  }

  formatTag(tag: string | null): string {
    if (!tag) return '';
    return tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
  }
  
  getDateFromSlug(slug: string): string {
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!m) return '';
    return `${m[1]}-${m[2]}-${m[3]}`;
  }
}
