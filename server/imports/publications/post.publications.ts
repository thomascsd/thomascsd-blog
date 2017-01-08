import { Posts } from './../../../both/collections/post.collections';
import { Meteor } from 'meteor/meteor';


Meteor.publish('posts', () => {
    return Posts.find({});
});