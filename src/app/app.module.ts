import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AUTH_PROVIDERS} from 'angular2-jwt';
import {Panel} from './panel/panel';
import {Leftmenu} from './panel/leftmenu/leftmenu';
import {Toolbar} from './panel/toolbar/toolbar';

import {AuthGuard} from './../common/auth.guard';
import {Home} from './home';
import {Login} from './auth/login';
import {Signup} from './auth/signup';
import {App} from './app';

import {routes} from './app.routes';

@NgModule({
  bootstrap: [App],
  declarations: [
    Home,
    Login,
    Signup,
    App,
    Panel,
    Leftmenu,
    Toolbar
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AuthGuard,
    ...AUTH_PROVIDERS
  ]
})
export class AppModule {
}
