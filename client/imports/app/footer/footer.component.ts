import { Component, OnInit } from '@angular/core';
import template from './footer.component.html';
import style from './footer.component.scss';

@Component({
  selector: 'app-footer',
  template,
  styles: [style]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}