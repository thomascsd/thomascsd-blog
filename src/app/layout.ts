import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `

    <header>
      <div class="nav-wrap">
        <nav aria-label="Primary">
          <a routerLink="/" routerLinkActive="active">Blog</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <button type="button" class="theme-toggle" (click)="toggleTheme()" [attr.aria-pressed]="isDark() ? 'true' : 'false'">
            {{ isDark() ? 'Dark' : 'Light' }}
          </button>
        </nav>
      </div>
    </header>

    <main>
      <div class="main-inner">
        <router-outlet />
      </div>
    </main>

    <footer>
      <small>© {{ year }} · Contact: <a href="https://github.com/thomascsd" rel="noopener" target="_blank">GitHub</a></small>
    </footer>
  `,
  styles: `
    :host {
      --bg: #ffffff;
      --text: #111827;
      --muted: #6b7280;
      --border: #e5e7eb;
      --link: #2563eb;
      display: block;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
    }

    :host([data-theme='dark']) {
      --bg: #0b0f1a;
      --text: #e5e7eb;
      --muted: #94a3b8;
      --border: #1f2937;
      --link: #60a5fa;
    }

    header {
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      backdrop-filter: saturate(180%) blur(8px);
      background: color-mix(in oklab, var(--bg) 85%, transparent);
      width: 100vw;
      left: 0;
    }

    .nav-wrap {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      padding: 1rem 2rem 1rem 2rem;
    }

    nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    nav a {
      padding: 0.5rem 0.25rem;
      text-decoration: none;
      color: var(--text);
      border-bottom: 2px solid transparent;
      font-size: 1.08rem;
    }

    nav a.active {
      border-bottom-color: var(--link);
      color: var(--link);
    }

    .theme-toggle {
      margin-left: 1.5rem;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text);
      padding: 0.4rem 0.7rem;
      border-radius: 6px;
      cursor: pointer;
    }

    .theme-toggle:focus-visible {
      outline: 2px solid var(--link);
      outline-offset: 2px;
    }

    main {
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 70vh;
    }

    .main-inner {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1rem 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    footer {
      border-top: 1px solid var(--border);
      margin-top: 2rem;
      padding: 2rem 1rem;
      text-align: center;
      color: var(--muted);
    }

    @media (max-width: 640px) {
      nav { flex-wrap: wrap; }
      .theme-toggle { margin-left: 0; }
    }
  `,
})
export class LayoutComponent {
  year = new Date().getFullYear();
  private theme = signal<'light' | 'dark'>('light');

  isDark() {
    return this.theme() === 'dark';
  }

  toggleTheme() {
    const next = this.isDark() ? 'light' : 'dark';
    this.theme.set(next);
    const host = (document.querySelector('app-root') as HTMLElement) ?? document.body;
    host.setAttribute('data-theme', next);
  }
}
