import {Routes} from '@angular/router';
import {Home} from './app/home';
import {Login} from './app/auth/login/login';
import {Signup} from './app/auth/signup/signup';
import {Auth as AuthGuard} from './guards/auth';
import {Panel} from './app/panel/panel';
import {Dashboard} from './app/panel/dashboard/dashboard'
import {List} from './app/panel/configurator/list/list'
import {Add} from './app/panel/configurator/add/add'

export const routes: Routes = [
  {path: '', component: Login},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {path: 'panel', component: Panel,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'configurator', children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: List },
        { path: 'add', component: Add },
      ]}
    ]
  },
  {path: '**', component: Login},
];
