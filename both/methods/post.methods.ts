import { Posts } from '../collections/post.collections';
import { Post } from '../models/post.model';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    insertPost(post: Post): void {

        Posts.insert({
            title: post.title,
            content: post.content,
            tag: post.tag,
            bgImageUrl: post.bgImageUrl || '',
            createdAt: new Date()
        });

    }

});