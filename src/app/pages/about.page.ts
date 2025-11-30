import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section aria-labelledby="about-title">
      <h1 id="about-title">About</h1>
      <article>
        <p class="muted">我是 Thomas，專注於 Web 與工程效率。這個部落格分享技術筆記、工具實作與學習心得。</p>
        <p>
          聯絡方式：
          <a href="mailto:thomas@example.com">Email</a>
          ·
          <a href="https://github.com/thomascsd" target="_blank" rel="noopener">GitHub</a>
        </p>
      </article>
    </section>
  `,
  styles: `
    :host { display: block; }
    .muted { color: var(--muted); }
    article { line-height: 1.7; }
  `,
})
export default class AboutPage {}
