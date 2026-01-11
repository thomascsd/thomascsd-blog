import { Component, inject, afterNextRender, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutComponent } from './layout';

declare var gtag: any;

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `
    <app-layout />
  `,
  styles: `
    :host { display: block; }
  `,
})
export class App {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId) && typeof gtag !== 'undefined') {
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe((event: any) => {
            gtag('event', 'page_view', {
              page_path: event.urlAfterRedirects,
            });
          });
      }
    });
  }
}
