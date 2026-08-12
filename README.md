# thomascsd-blog

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm test -- --run` to run unit tests with [Vitest](https://vitest.dev).

## SEO build verification

`npm run build` first generates `public/robots.txt` and `public/sitemap.xml` from the Markdown front matter, then creates the Analog static build. After a build, run `npm run verify:seo` to inspect the actual `dist/analog/public` output for prerendered metadata, canonical URLs, BlogPosting JSON-LD, robots, and sitemap invariants.

The SEO checks are local build-output checks only; deployment and production-site HTTP validation are intentionally outside this repository workflow. The RSS feed remains available at `/api/rss.xml` and emits trailing-slash article URLs.

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)
