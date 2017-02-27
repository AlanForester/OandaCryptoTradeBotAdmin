import {Component} from '@angular/core';

const style = require('./view.css');
const template = require('./view.html');

@Component({
  selector: 'view',
  template,
  styles: [style]
})

export class View {
  constructor() {
  }

}
