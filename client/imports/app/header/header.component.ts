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

  constructor() { }

  ngOnInit() {
  }

}