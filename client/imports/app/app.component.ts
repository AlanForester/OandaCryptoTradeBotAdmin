import { Component, OnInit } from '@angular/core';
import { ISlimScrollOptions } from '../directives/slimscroll/slimscroll-options.class';
//noinspection TypeScriptCheckImport
import style from './app.component.scss';
//noinspection TypeScriptCheckImport
import template from './app.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

import "metismenu";
declare var $:JQueryStatic;
@Component({
  selector: 'app',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class AppComponent implements OnInit {
  opts: ISlimScrollOptions;
  constructor() {

  }

  logout() {
    Meteor.logout();
  }

  ngOnInit() {
    this.opts = {
      barOpacity: "0.4",
      gridOpacity: "0.0",
      barWidth: "8",
      barBackground: '#000000'
    };

    $('#side-menu').metisMenu();

  }

}
