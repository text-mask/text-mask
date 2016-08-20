import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {disableDeprecatedForms, provideForms, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {bootstrap} from '@angular/platform-browser-dynamic'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import MaskedInput from '../src/angular2TextMask'

@Component({
  selector: 'app',
  templateUrl: 'app.html',
  directives: [MaskedInput]
})
class AppComponent {
  public myModel
  public mask

  constructor() {
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    this.myModel = ''
  }

  maskedInput = new FormControl()
}

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, MaskedInput],
  bootstrap: [AppComponent]
})
export class AppModule {}

// noinspection TypeScriptValidateTypes
// bootstrap(AppComponent, [
//   provideForms(),
//   disableDeprecatedForms()
// ])

platformBrowserDynamic().bootstrapModule(AppModule);
