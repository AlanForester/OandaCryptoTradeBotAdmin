import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AccountsModule} from 'angular2-meteor-accounts-ui';

import {AppComponent} from "./app.component";
import {routes, ROUTES_PROVIDERS} from './app.routes';
import {PARTIES_DECLARATIONS} from './parties';
import {SHARED_DECLARATIONS} from './shared';
import {AUTH_DECLARATIONS} from "./auth/index";
import {DIRECTIVES_DECLARATIONS} from "../directives/index";
import {PanelComponent} from "./panel/penel.component"

let moduleDefinition;


moduleDefinition = {
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule
    ],
    declarations: [
        AppComponent,
        ...PARTIES_DECLARATIONS,
        ...SHARED_DECLARATIONS,
        ...AUTH_DECLARATIONS,
        ...DIRECTIVES_DECLARATIONS,
        PanelComponent
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
};


@NgModule(moduleDefinition)
export class AppModule {
}