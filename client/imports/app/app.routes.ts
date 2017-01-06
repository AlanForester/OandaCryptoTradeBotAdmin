import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './parties/parties-list.component';
import {SignupComponent} from "./auth/signup.component";
import {LoginComponent} from "./auth/login.component";
import {PanelComponent} from "./panel/penel.component";


export const routes: Route[] = [
  { path: '', component: PartiesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'panel', component: PanelComponent},
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
