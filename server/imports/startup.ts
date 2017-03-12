import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

export class Startup {
    init() {
        const username = Meteor.settings.public['adminUser'];
        const pwd = Meteor.settings.public['adminPassword'];
        const admin = Accounts.findUserByUsername(username);

        console.log('admin' + JSON.stringify(admin));

        if (!admin) {
            Accounts.createUser({
                username: username,
                password: pwd
            });
        }

    }
}

