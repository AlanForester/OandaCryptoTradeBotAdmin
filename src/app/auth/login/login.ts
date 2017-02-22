import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth as AuthService } from '../../../services/auth';

const styles   = require('./login.css');
const template = require('./login.html');


@Component({
  selector: 'login',
  template: template,
  styles: [ styles ]
})

export class Login implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  signup(event) {
    this.router.navigate(['signup']);
  }

}
