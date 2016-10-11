import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {TextMaskModule} from '../src/angular2TextMask'

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
class AppComponent {
  public myModel: string
  public modelWithValue: string
  public formControlInput: FormControl = new FormControl()
  public mask: Array<string | RegExp>

  constructor() {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.myModel = ''
    this.modelWithValue = '5554441234'
    this.formControlInput.setValue('5555551234')
  }
}

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, TextMaskModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
