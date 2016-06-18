///<reference path="../typings/index.d.ts"/>

import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic'
import MaskedInput from '../src/angular2TextMask'

// In your own application, you would do:
// import MaskedInput from 'angular2-text-mask'

@Component({
  selector: 'app',
  templateUrl: 'app.html',
  directives: [MaskedInput]
})
class AppComponent {
  private mask = '(111) 111 1111'
  private myModel = ''

  onMaskChange(event) {
    this.mask = event.target.value
  }
}

bootstrap(AppComponent);
