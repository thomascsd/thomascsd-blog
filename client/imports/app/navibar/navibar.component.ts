import { Component, OnInit } from '@angular/core';
import template from './navibar.component.html';
import style from './navibar.component.scss';

@Component({
  selector: 'app-navibar',
  template,
  styles: [ style ]
})
export class NavibarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}