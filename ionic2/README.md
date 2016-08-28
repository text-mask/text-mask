# Ionic 2 Input Mask

## Getting started

First, install it.

```bash
npm i ionic2-input-mask --save
```

Then, require it and use it:

```typescript
import {Component} from '@angular/core';
import {Directive} from 'ionic2-text-mask'

@Component({
  selector: 'app',
  template: `
    <ion-input [textMask]="{mask: mask}" [(ngModel)]="myModel"/>
  `,
  directives: [Directive]
})
export class SomeComponent {
  public myModel = ''
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}
```
