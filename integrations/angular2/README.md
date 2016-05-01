# Angular 2 Input Mask

## Getting started

First, install it.

```bash
npm i @msafi/angular2-text-mask --save
```

Then, require it and use it:

```typescript
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

## Example

You can see a working example in
[this folder](https://github.com/msafi/text-mask/tree/master/integrations/angular2/example).

## Source code

The source code for Angular 2 Text Mask is [available here](https://github.com/msafi/text-mask/tree/master/integrations/angular2).

## License

Public domain - [CC0 1.0 Universal (CC0 1.0)](https://creativecommons.org/publicdomain/zero/1.0/)
