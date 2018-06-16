const Prism = require('prismjs')

module.exports = {
  content: {
    permalink: '/:slug',
    page: '/_content',
    generate: [ // for static build
      'get', 'getAll'
    ],
    isPost: true
  },
  api: {
    baseURL: process.env.NODE_ENV === 'production'
    ? 'https://thomascsd.github.io'
    : 'http://localhost:3200'
  },
  parsers: {
    md: {
      extend(config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)}</code></pre>`
        }
      }
    }
  }
}