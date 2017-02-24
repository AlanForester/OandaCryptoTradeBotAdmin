import {Component} from '@angular/core';

const style = require('./form.css');
const template = require('./form.html');

@Component({
  selector: 'form',
  template,
  styles: [style]
})

export class Form {
  constructor() {
  }

}
