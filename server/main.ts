import { Meteor } from 'meteor/meteor';
import { Startup } from './imports/startup';

Meteor.startup(() => {
    const startup = new Startup();

    startup.init();
})