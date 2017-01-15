import { Component, OnInit } from '@angular/core';
import template from './postlist.component.html';
import { MeteorObservable } from 'meteor-rxjs';
import { Posts } from './../../../../both/collections/post.collections';
import { Post } from './../../../../both/models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-postlist',
  template
})
export class PostlistComponent implements OnInit {
  posts: Post[];

  constructor() { }

  ngOnInit() {
    MeteorObservable.subscribe('posts').subscribe();
    Posts.find({})
      .zone()
      .subscribe((datas: Post[]) => {
        this.posts = datas;
      });
  }

}