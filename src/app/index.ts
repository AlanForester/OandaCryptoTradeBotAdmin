import {Panel} from './panel/panel';
import {Leftmenu} from './panel/components/leftmenu/leftmenu';
import {Toolbar} from './panel/components/toolbar/toolbar';

import {Home} from './home';
import {Login} from './auth/login';
import {Signup} from './auth/signup';

import {Dashboard} from './panel/dashboard/dashboard'

import {List as ConfiguratorList} from './panel/configurator/list/list'
import {Form as ConfiguratorForm} from './panel/configurator/form/form'

import {List as AnalyzerList} from './panel/analyzer/list/list';
import {View as AnalyzerView} from './panel/analyzer/view/view';

import {Signals} from './panel/signals/signals';
import {Patterns} from './panel/patterns/patterns'
import {Predictions} from './panel/predictions/predictions'

export const APP_DECLARATIONS: any[] = [
  Panel,
  Leftmenu,
  Toolbar,
  Home,
  Login,
  Signup,
  Dashboard,
  ConfiguratorList,
  ConfiguratorForm,
  AnalyzerList,
  AnalyzerView,
  Signals,
  Patterns,
  Predictions
];
