import { Component, OnInit, Input } from '@angular/core';
import template from './header.component.html';

@Component({
  selector: 'app-header',
  template
})
export class HeaderComponent implements OnInit {
  @Input()
  bgUrl: string = '';

  @Input()
  heading: string = '';

  @Input()
  subheading: string = '';

  @Input()
  meta: string = '';

  bgImage: string;

  constructor() { }

  ngOnInit() {
    this.bgImage = `url(${this.bgUrl})`;
  }

}