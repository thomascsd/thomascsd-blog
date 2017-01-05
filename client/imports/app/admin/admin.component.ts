import { Component, OnInit } from '@angular/core';
import template from './admin.component.html';
import { Post } from '../../../../both/models/post.model';
import { Posts } from '../../../../both/collections/post.collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  template
})
export class AdminComponent implements OnInit {
  postForm: FormGroup

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

  saveData() {
    if (this.postForm.valid) {
      const data = this.postForm.value as Post;

      Posts.insert({
        title: data.title,
        content: data.content,
        tag: data.tag,
        createdAt: new Date()
      });

    }

  }

}