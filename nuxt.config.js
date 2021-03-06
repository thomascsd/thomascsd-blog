module.exports = {
  head: {
    title: 'Thomas blog',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Thomas Blog'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.4.1.slim.min.js', body: true },
      { src: '/bootstrap.min.js', body: true }
    ]
  },
  build: {
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: [
    'nuxtent',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-102188481-1'
      }
    ],
    '@nuxtjs/sitemap'
  ],
  loading: {
    color: '#3B8070'
  },
  css: ['prismjs/themes/prism.css', '~/css/style.min.css'],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://thomascsd.github.io',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true, // Enable me when using nuxt generate
    routes: [
      '/hello-world',
      '/build-blog-with-jekyll',
      '/vuejs-in-aspnet-mvc',
      '/vscode-debug-for-nodejs-andn-agular',
      '/nuxtjs-and-nuxten',
      '/example-of-promise',
      '/tutorial-of-draxtjs',
      '/module-pattern',
      '/module-pattern-part2',
      '/create-library-with-angular',
      '/tutorial-of-uppy',
      '/tutorial-of-vscode-extension',
      '/svg-and-angular',
      '/class-validator-and-ngx-dynamic-form-builder',
      '/angular-library'
    ]
  }
};
