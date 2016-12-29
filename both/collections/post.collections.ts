import { Meteor } from 'meteor/meteor';
import { MongoObservable } from 'meteor-rxjs';
import { Post } from '../models/post.model';

export const Posts = new MongoObservable.Collection<Post>('Posts');

function isLogin() {
    console.log('meteor:' + Meteor.user);

    return !!Meteor.user();
}

Posts.allow({
    insert: isLogin,
    update: isLogin,
    remove: isLogin
});