import type {
  PostDateInput,
  PostDescriptionInput,
  SeoPostInput,
} from './seo-types';

export const SITE_URL = 'https://thomascsd.github.io';
export const DEFAULT_SOCIAL_IMAGE = '/images/bgBlog.png';

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const [pathname, query = ''] = normalized.split('?', 2);
  const withTrailingSlash = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  return `${SITE_URL}${withTrailingSlash}${query ? `?${query}` : ''}`;
}

export function absoluteAssetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function getPostDate(post: PostDateInput): string {
  if (post.datePublished?.trim()) return post.datePublished.trim();
  return post.slug.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? '';
}

export function getDescription(post: PostDescriptionInput): string {
  const description = post.description?.trim();
  return description || `閱讀 Thomas Blog 的技術文章：${post.title.trim()}。`;
}

const TAG_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  expressjs: 'Express.js',
  dotnet: '.NET',
  vscode: 'VS Code',
  nodejs: 'Node.js',
  vuejs: 'Vue.js',
  vue: 'Vue.js',
};

export function formatTag(tag: string): string {
  const normalized = tag.trim().toLowerCase();
  return TAG_LABELS[normalized]
    ?? normalized
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getPostImage(post: Pick<SeoPostInput, 'bgImageUrl' | 'image'>): string {
  return post.image?.trim() || post.bgImageUrl?.trim() || DEFAULT_SOCIAL_IMAGE;
}
