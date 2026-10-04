/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';
import { getPrerenderRoutes } from './scripts/generate-seo-assets.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      content: {
        highlighter: 'prism',
        prismOptions: {
          additionalLangs: ['csharp'],
        },
      },
      prerender: {
        routes: async () => [
          '/',
          '/blog',
          '/api/rss.xml',
          {
            contentDir: 'src/content',
            transform: (file: PrerenderContentFile) => {
              const slug = file.attributes['slug'];
              return `/blog/${slug}`;
            },
          },
          '/about',
          '/tags',
          ...(await getPrerenderRoutes()),
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
