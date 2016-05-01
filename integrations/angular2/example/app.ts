import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import MaskedInput from '../src/angular2TextMask'
// import MaskedInput from '../dist/textMask'

@Component({
  selector: 'app',
  templateUrl: 'app.html',
  directives: [MaskedInput]
})
export class AppComponent {
  private mask = '(111) 111 1111'
  private myModel = ''

  onMaskChange(event) {
    this.mask = event.target.value
  }
}

bootstrap(AppComponent);
