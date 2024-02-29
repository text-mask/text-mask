# Ionic 3 Input Mask

## Getting started

First, install it.

```bash
npm i ionic3-text-mask --save
```

Then, import it into your `@NgModule`:

```typescript
import { NgModule } from '@angular/core';
import { MyPage } from './my-page';
import { IonicPageModule } from 'ionic-angular';
import { IonInputMaskModule } from 'ionic3-text-mask';

@NgModule({
  imports: [
    IonicPageModule.forChild(MyPage),
    IonInputMaskModule
  ],
  declarations: [
    MyPage
  ]
})
export class MyModule {}
```

Then, use it in your component or page:
```typescript
@IonicPage()
@Component({
  selector: 'my-page',
  template: `
    <ion-input [ionTextMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/>
  `
})
export class MyPage {
  public myModel = ''
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}
```

## Documentation

As you can see in the code above, you are passing an object to the `ionTextMask` directive.

&#x1F4CD; For more information about the values that the `ionTextMask` object accepts, see 
**[this page](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)**.

Also make sure you import the module at the component level (<your component>.module.ts), not the app level (app.module.ts).

