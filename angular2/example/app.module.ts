import {NgModule}      from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TextMaskModule} from '../src/angular2TextMask'
import AppComponent from './app.component'

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, TextMaskModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
