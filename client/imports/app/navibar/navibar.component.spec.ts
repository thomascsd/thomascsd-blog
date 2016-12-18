/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavibarComponent } from './navibar.component';

describe('NavibarComponent', () => {
  let component: NavibarComponent;
  let fixture: ComponentFixture<NavibarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavibarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});