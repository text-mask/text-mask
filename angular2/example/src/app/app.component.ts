import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TextMaskModule } from '../../../src/angular2TextMask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public myModel: string;
  public modelWithValue: string;
  public formControlInput: FormControl = new FormControl();
  public mask: Array<string | RegExp>;

  constructor() {
    this.mask = [
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
    this.myModel = '';
    this.modelWithValue = '5554441234';
    this.formControlInput.setValue('5555551234');
  }
}
