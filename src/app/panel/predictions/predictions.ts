import {Component} from '@angular/core';

const style = require('./predictions.css');
const template = require('./predictions.html');

@Component({
  selector: 'predictions',
  template,
  styles: [style]
})

export class Predictions {
  constructor() {
  }

}
