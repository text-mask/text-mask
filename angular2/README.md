# Angular 2 Input Mask

&#x1F6A7; **This Angular 2 directive is experimental**. It basically works but I'm not an Angular 2
user, so if you encounter a problem, I may not be able to help you.
But, please, give it a go anyway! And if you wanna help make this project better, feel free to
[open an issue](https://github.com/msafi/text-mask/issues) or
[contribute](https://github.com/msafi/text-mask/blob/master/contributing.md#readme)!

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

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:msafi/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run angular2:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`angular2/example`](https://github.com/msafi/text-mask/tree/master/angular2/example).

## Documentation

As you can see in the example above, you are passing an object to the `textMask` directive.

For more information about the values that the `textMask` object accepts, see
the [documentation here](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#readme).

## Contributing

We would love some contributions! Check out [this document](https://github.com/msafi/text-mask/blob/master/contributing.md#readme) to get started.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
