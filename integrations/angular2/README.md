# Angular 2 Input Mask

## Getting started

First, install it.

```
npm i @msafi/angular2-text-mask --save
```

Then, require it and use it:

```js
import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import MaskedInput from '@msafi/angular2-text-mask'

@Component({
  selector: 'app',
  templateUrl: `
    <input [textMask]="{mask: '(111) 111 1111'}" [(ngModel)]="myModel" type="text"/>
  `,
  directives: [MaskedInput]
})
export class AppComponent {
  private myModel = ''
}

bootstrap(AppComponent);
```
