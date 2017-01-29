import 'angular2-meteor-polyfills';
import { Meteor } from 'meteor/meteor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';

Meteor.startup(() => {
  // Фиксированые левый сайд бар и верхний
  // const platform = platformBrowserDynamic();
  // platform.bootstrapModule(AppModule);
});