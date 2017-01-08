import { MeteorObservable } from 'meteor-rxjs';
import { Posts } from './../../../../both/collections/post.collections';
import { Post } from './../../../../both/models/post.model';
import { Component, OnInit } from '@angular/core';
import template from './post.component.html';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  template
})
export class PostComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor() { }

  ngOnInit() {
    MeteorObservable.subscribe('posts').subscribe();
    this.posts = Posts.find({}).zone();

  }

}