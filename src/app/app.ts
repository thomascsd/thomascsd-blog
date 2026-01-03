import { Component, inject, afterNextRender } from '@angular/core';
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

  constructor() {
    afterNextRender(() => {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          gtag('event', 'page_view', {
            page_path: event.urlAfterRedirects,
          });
        });
    });
  }
}
