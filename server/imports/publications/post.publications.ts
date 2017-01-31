import { Posts } from './../../../both/collections/post.collections';
import { Meteor } from 'meteor/meteor';


Meteor.publish('posts', () => {
    return Posts.find({}, {
        sort: { createdAt: -1 }
    });
});

Meteor.publish('post', (id: any) => {
    return Posts.findOne({ _id: id });
});