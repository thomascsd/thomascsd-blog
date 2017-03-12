import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Post } from '../../../../both/models/post.model';
import { Posts } from '../../../../both/collections/post.collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import template from './admin.component.html';
import '../../assets/js/bootstrap-markdown.min.js';

@Component({
  selector: 'app-admin',
  template
})
export class AdminComponent implements OnInit, AfterViewInit {
  postForm: FormGroup;

  @ViewChild("content")
  el: ElementRef;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    console.log('jquery:' + typeof $);
    $(this.el.nativeElement).markdown();

  }

  saveData() {
    if (this.postForm.valid) {
      const data = this.postForm.value as Post;

      MeteorObservable
        .call<Post>('insertPost', data)
        .subscribe(() => {
          alert('save successly');
        });

    }

  }

}