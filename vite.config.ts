/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';

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
      },
      prerender: {
        routes: [
          '/',
          '/blog',
          {
            contentDir: 'src/content',
            transform: (file: PrerenderContentFile) => {
              const slug = file.attributes['slug'];
              return `/blog/${slug}`;
            },
          },
          '/about',
          '/tags',
          {
            contentDir: 'src/content',
            transform: (file: PrerenderContentFile) => {
              const tagNames = new Set<string>();
              if (file.attributes['tags']) {
                file.attributes['tags'].forEach((tag: string) => {
                  tagNames.add(tag);
                });
              }
              const slug = Array.from(tagNames)[0];
              return `/tags/${slug}`;
            },
          },
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
