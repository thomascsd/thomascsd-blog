import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { User } from '../../../../both/models/user.model';
import template from './Login.component.html';


@Component({
  selector: 'app-Login',
  template
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const user = this.userForm.value as User;

    Meteor.loginWithPassword(user.username, user.password, (error) => {
      if (!error) {
        this.router.navigate(['admin']);
      }
    });
  }

}