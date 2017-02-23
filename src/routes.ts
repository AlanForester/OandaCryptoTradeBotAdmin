import {Routes} from '@angular/router';
import {Home} from './app/home';
import {Login} from './app/auth/login/login';
import {Signup} from './app/auth/signup/signup';
import {Auth as AuthGuard} from './guards/auth';
import {Panel} from './app/panel/panel';

export const routes: Routes = [
  {path: '', component: Login},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {path: 'panel', component: Panel},
  {path: '**', component: Login},
];
