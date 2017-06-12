import {Component} from '@angular/core'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export default class AppComponent {
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
