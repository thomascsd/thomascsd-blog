import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class LoggedInGuardService implements CanActivate {

    constructor(private router: Router) {

    }
    canActivate() {
        const isLogin = !!Meteor.user();

        if (isLogin) {
            console.log('logined');
            return true;
        }
        else {
            this.router.navigate(['login']);
            console.log('Not Login, redirect to login')
            return false;
        }

    }
}