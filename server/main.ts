import { Meteor } from 'meteor/meteor';
import { Startup } from './imports/startup';
import '../both/methods/post.methods';
import './imports/publications/post.publications';

Meteor.startup(() => {
    const startup = new Startup();

    startup.init();
})