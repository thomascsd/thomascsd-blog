export interface SeoPostInput {
  title: string;
  slug: string;
  description?: string;
  bgImageUrl?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export interface SeoPageData {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export interface BlogPostingJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { '@type': 'Person'; name: string };
  mainEntityOfPage: { '@type': 'WebPage'; '@id': string };
  image: string;
}

export interface PostDateInput {
  slug: string;
  datePublished?: string;
}

export interface PostDescriptionInput {
  title: string;
  description?: string;
}
