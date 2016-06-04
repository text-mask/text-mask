import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic'
import MaskedInput from '../src/angular2TextMask'
// import MaskedInput from '../dist/textMask'

@Component({
  selector: 'app',
  templateUrl: 'app.html',
})
class AppComponent {
  private mask = '(111) 111 1111'
  private myModel = ''

  onMaskChange(event) {
    this.mask = event.target.value
  }
}

bootstrap(AppComponent);
