import {Routes} from '@angular/router';
import {Home} from './app/home';
import {Login} from './app/auth/login/login';
import {Signup} from './app/auth/signup/signup';
import {Auth as AuthGuard} from './guards/auth';
import {Panel} from './app/panel/panel';
import {Dashboard} from './app/panel/dashboard/dashboard';
import {List as ConfiguratorList} from './app/panel/configurator/list/list';
import {Form as ConfiguratorForm} from './app/panel/configurator/form/form';
import {List as AnalyzerList} from './app/panel/analyzer/list/list';
import {View as AnalyzerView} from './app/panel/analyzer/view/view';


export const routes: Routes = [
  {path: '', component: Login},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {
    path: 'panel', component: Panel,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: Dashboard},
      {
        path: 'configurator', children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: ConfiguratorList},
        {path: 'add', component: ConfiguratorForm},
        {path: 'edit/:id', component: ConfiguratorForm},
      ]
      },
      {
        path: 'analyzer', children: [
        {path: '', redirectTo: 'list', pathMatch: 'full'},
        {path: 'list', component: AnalyzerList},
        {path: 'view/:config/:scope', component: AnalyzerView},
        {path: '**', component: AnalyzerList},
      ]
      }
    ]
  },
  {path: '**', component: Login},
];
