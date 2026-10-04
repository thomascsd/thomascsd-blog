import type { BlogPostingJsonLd, SeoPostInput } from './seo-types';
import { absoluteAssetUrl, absoluteUrl, getDescription, getPostDate, getPostImage } from './seo-utils';

export function buildBlogPostingJsonLd(post: SeoPostInput): BlogPostingJsonLd {
  const published = getPostDate(post);
  const modified = post.dateModified?.trim() || published;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: getDescription(post),
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Person', name: post.author?.trim() || 'Thomas' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
    image: absoluteAssetUrl(getPostImage(post)),
  };
}
