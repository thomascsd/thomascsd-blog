import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Post } from '../../../../both/models/post.model';
import { Posts } from '../../../../both/collections/post.collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  postForm: FormGroup;

  @ViewChild("content")
  el: ElementRef;

  @Input()
  post: Post;

  constructor(private fb: FormBuilder) {
  }


  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tag: ['', Validators.required],
      bgImageUrl: ['']
    });

    if (this.post) {
      this.postForm.setValue(this.post);
    }

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