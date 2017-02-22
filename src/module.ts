import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AUTH_PROVIDERS} from 'angular2-jwt';
import {SERVICE_PROVIDERS} from './services/index'
import {GUARD_PROVIDERS} from './guards/index'
import {MODEL_PROVIDERS} from './models/index'

import {App} from './app/app';
import {APP_DECLARATIONS} from './app/index'

import {routes} from './routes';

@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ...APP_DECLARATIONS
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
    ...AUTH_PROVIDERS,
    ...SERVICE_PROVIDERS,
    ...GUARD_PROVIDERS,
    ...MODEL_PROVIDERS
  ]
})
export class AppModule {
}


