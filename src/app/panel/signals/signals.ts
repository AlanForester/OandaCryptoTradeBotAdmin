import {Component} from '@angular/core';

const style = require('./signals.css');
const template = require('./signals.html');

@Component({
  selector: 'signals',
  template,
  styles: [style]
})

export class Signals {
  public config: number;
  constructor() {
    this.config = 1
  }

}
