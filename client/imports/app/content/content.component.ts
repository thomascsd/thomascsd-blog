import { Component, OnInit } from '@angular/core';
import template from './content.component.html';
import style from './content.component.scss';

@Component({
  selector: 'app-content',
  template,
  styles: [style]
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}