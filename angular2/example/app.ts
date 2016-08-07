import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

import {Component} from '@angular/core'
import {disableDeprecatedForms, provideForms} from '@angular/forms'
import {bootstrap} from '@angular/platform-browser-dynamic'
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
}

// noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [
  provideForms(),
  disableDeprecatedForms()
])
