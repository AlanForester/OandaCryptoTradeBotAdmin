import { Component, OnInit, AfterViewInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import style from './app.component.scss';
//noinspection TypeScriptCheckImport
import template from './app.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

import "metismenu";
import "jquery-slimscroll"

declare var $:JQueryStatic;
@Component({
    selector: 'app',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class AppComponent implements OnInit, AfterViewInit {
    //opts: ISlimScrollOptions;
    constructor() {

    }
}
