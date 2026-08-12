import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { SeoPageData } from './seo-types';
import { absoluteAssetUrl, absoluteUrl, DEFAULT_SOCIAL_IMAGE } from './seo-utils';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoPageData): void {
    const url = absoluteUrl(data.path);
    const image = absoluteAssetUrl(data.image || DEFAULT_SOCIAL_IMAGE);
    const type = data.type || 'website';

    this.title.setTitle(data.title);
    this.meta.removeTag('name="description"');
    this.meta.removeTag('rel="canonical"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('property="article:published_time"');
    this.meta.removeTag('property="article:modified_time"');
    this.meta.removeTag('property="article:author"');

    this.meta.addTag({ name: 'description', content: data.description });
    this.setCanonical(url);
    this.meta.addTags([
      { property: 'og:title', content: data.title },
      { property: 'og:description', content: data.description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.title },
      { name: 'twitter:description', content: data.description },
      { name: 'twitter:image', content: image },
    ]);

    if (data.publishedTime) this.meta.addTag({ property: 'article:published_time', content: data.publishedTime });
    if (data.modifiedTime) this.meta.addTag({ property: 'article:modified_time', content: data.modifiedTime });
    if (data.author) this.meta.addTag({ property: 'article:author', content: data.author });
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }
}

export default SeoService;
