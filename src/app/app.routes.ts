import {Routes} from '@angular/router';
import {Home} from './home';
import {Login} from './auth/login/login';
import {Signup} from './auth/signup/signup';
import {AuthGuard} from './../common/auth.guard';
import {Panel} from './panel/panel';

export const routes: Routes = [
  {path: '', component: Login},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {path: 'panel', component: Panel},
  {path: '**', component: Login},
];
