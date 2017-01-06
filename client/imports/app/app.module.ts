import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AccountsModule} from 'angular2-meteor-accounts-ui';

import {AppComponent} from "./app.component";
import {routes, ROUTES_PROVIDERS} from './app.routes';

import {SHARED_DECLARATIONS} from './shared';
import {AUTH_DECLARATIONS} from "./auth/index";
import {DIRECTIVES_DECLARATIONS} from "../directives/index";
import {PanelComponent} from "./panel/panel.component";
import {MainComponent} from "./main/main.component"
import {LeftmenuComponent} from "./panel/leftmenu/leftmenu.component";
import {ToolbarComponent} from "./panel/toolbar/toolbar.component";

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
        ...SHARED_DECLARATIONS,
        ...AUTH_DECLARATIONS,
        ...DIRECTIVES_DECLARATIONS,
        PanelComponent,
        MainComponent,
        LeftmenuComponent,
        ToolbarComponent
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