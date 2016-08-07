# Angular 2 Input Mask

&#x1F6A7; **This Angular 2 directive is experimental**. It may not work properly or at all. However,
making it work should be pretty simple for someone who knows TypeScript and Angular 2.
If you're interested in helping out, please [email me](mailto:msafi@msafi.com).

## Getting started

First, install it.

```bash
npm i angular2-text-mask --save
```

Then, require it and use it:

```typescript
import {bootstrap} from '@angular/platform-browser-dynamic'
import {Component} from '@angular/core';
import MaskedInput from 'angular2-text-mask'

@Component({
  selector: 'app',
  templateUrl: `
    <input [textMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/>
  `,
  directives: [MaskedInput]
})
export class AppComponent {
  public myModel = ''
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}

bootstrap(AppComponent);
```

## Documentation

As you can see in the code above, you are passing an object to the `textMask` directive.

For more information about the values that the `textMask` object accepts, see
the [documentation here](https://github.com/msafi/text-mask/blob/master/componentDocumentation.md#readme).

## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `git clone git@github.com:msafi/text-mask.git`
1. `cd text-mask`
1. `npm install`
1. `npm run angular2:dev`
1. Open [http://localhost:3000](http://localhost:3000)

The code of the example is in [`angular2/example`](https://github.com/msafi/text-mask/tree/master/angular2/example).

## Contributing

We would love some contributions! Check out [this document](https://github.com/msafi/text-mask/blob/master/howToContribute.md#readme) to get started.

## License

Public domain - [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
