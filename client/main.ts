import 'angular2-meteor-polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';
import '../both/methods/parties.methods';

Meteor.startup(() => {
  document.body.className = "pace-done fixed-nav fixed-nav-basic fixed-sidebar";
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
});