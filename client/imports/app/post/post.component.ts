import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import template from './post.component.html';
import { MeteorObservable } from 'meteor-rxjs';
import { Posts } from './../../../../both/collections/post.collections';
import { Post } from './../../../../both/models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  template
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    MeteorObservable.subscribe('posts').subscribe();

    this.route.params
      .subscribe((params: Params) => {
        this.post = Posts.findOne({ '_id': params['id'] });
      });

  }

}