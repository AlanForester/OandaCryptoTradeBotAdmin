import {Component} from '@angular/core';

const style = require('./list.css');
const template = require('./list.html');

@Component({
  selector: 'list',
  template,
  styles: [style]
})

export class List {
  constructor() {
  }

}
