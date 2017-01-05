import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class LoggedInGuardService implements CanActivate {

    constructor(private router: Router) {

    }
    canActivate() {
        if (Meteor.user()) {
            return true;;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }

    }
}