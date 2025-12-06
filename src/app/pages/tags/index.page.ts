import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-tags-index',
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Tags</h1>
      <div class="tags-list">
        @for (tag of tags; track tag.name) {
          <a [routerLink]="['/tags', tag.name]" class="tag-item">
            <span class="tag-name">{{ formatTag(tag.name) }}</span>
            <span class="tag-count">{{ tag.count }}</span>
          </a>
        }
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 {
      margin-bottom: 2rem;
      text-align: center;
    }
    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    .tag-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: var(--border);
      border-radius: 9999px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }
    .tag-item:hover {
      background-color: var(--muted);
      color: white;
      transform: translateY(-2px);
    }
    .tag-count {
      background-color: rgba(0,0,0,0.1);
      padding: 0.1rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.85rem;
    }
  `
})
export default class TagsIndexPage {
  readonly posts = injectContentFiles<PostAttributes>();

  get tags() {
    const tagCounts = new Map<string, number>();
    
    this.posts.forEach(post => {
      if (post.attributes.tags) {
        post.attributes.tags.forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      }
    });

    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  formatTag(tag: string): string {
    return tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
  }
}
