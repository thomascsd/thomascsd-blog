const Prism = require('prismjs')

module.exports = {
  content: {
    permalink: ':year/:slug',
    page: '/_content',
    generate: [ // for static build
      'get', 'getAll'
    ],
    isPost: false
  },
  api: {
    baseURL: 'http://localhost:3200',
    browserBaseURL: 'http://localhost:3200'
  },
  parsers: {
    md: {
      extend(config) {
        config.highlight = (code, lang) => {
          return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)}</code></pre>`
        }
      }
    }
  },
  css: [
    'prismjs/themes/prism-okaidia.css'
  ]
}
