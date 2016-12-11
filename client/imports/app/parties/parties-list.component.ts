import { Component } from '@angular/core';

//noinspection TypeScriptCheckImport
import template from './parties-list.component.html';
//noinspection TypeScriptCheckImport
import style from './parties-list.component.scss';

@Component({
  selector: 'parties-list',
  template,
  styles: [ style ]
})
export class PartiesListComponent {
  constructor() {
  }
}
