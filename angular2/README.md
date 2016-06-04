# Angular 2 Input Mask

## Getting started

First, install it.

```bash
npm i angular2-text-mask --save
```

Then, require it and use it:

```typescript
import 'es6-shim';
import 'es6-promise';
import 'zone.js/dist/zone';
import 'reflect-metadata';

import {bootstrap} from '@angular/platform-browser-dynamic'
import {Component} from '@angular/core';
import MaskedInput from 'angular2-text-mask'

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
[this folder](https://github.com/msafi/text-mask/tree/master/angular2/example).

## Documentation

As you can see in the example above, you are passing an object to the `textMask` directive.

For more information about the values that the `textMask` object accepts, see
the [documentation here](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#readme).

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
