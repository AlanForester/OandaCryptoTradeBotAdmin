import {Component} from '@angular/core';

const style = require('./dashboard.css');
const template = require('./dashboard.html');

@Component({
  selector: 'dashboard',
  template,
  styles: [style]
})

export class Dashboard {
  public config: number;
  constructor() {
    this.config = 1
  }

}
