# Ionic 3 Input Mask

## Getting started

First, install it.

```bash
npm i ionic3-text-mask --save
```

Then, import it into your `@NgModule`:

```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInputMaskModule } from 'ionic3-text-mask';

@NgModule({
  imports: [
    FormsModule,
    TextMaskModule
  ],
  declarations: []
})
export class MyModule {}
```

Then, use it in your component:
```typescript
@Component({
  selector: 'app',
  template: `
    <ion-input [ionTextMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/>
  `
})
export class AppComponent {
  public myModel = ''
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
}
```

## Documentation

As you can see in the code above, you are passing an object to the `textMask` directive.

&#x1F4CD; For more information about the values that the `textMask` object accepts, see 
**[this page](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme)**.

#### Other use-cases

##### Unmasking the value that is stored in the model

Text Mask does not provide an option to unmask the model before storing it. You can sanitize the model on your
side. See [here](https://github.com/text-mask/text-mask/issues/109) for details.

