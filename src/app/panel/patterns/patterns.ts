import {Component} from '@angular/core';

const style = require('./patterns.css');
const template = require('./patterns.html');

@Component({
  selector: 'patterns',
  template,
  styles: [style]
})

export class Patterns {
  constructor() {
  }

}
