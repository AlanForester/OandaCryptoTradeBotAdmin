import { Component } from '@angular/core';

//noinspection TypeScriptCheckImport
import style from './app.component.scss';
//noinspection TypeScriptCheckImport
import template from './app.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

@Component({
  selector: 'app',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent {
  constructor() {

  }

  logout() {
    Meteor.logout();
  }
}
