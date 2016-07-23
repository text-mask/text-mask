import {Directive, ElementRef, Input} from '@angular/core'
import {NgControl} from '@angular/forms'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

@Directive({
  selector: 'input[textMask]',
  host: {
    '(input)': 'onInput()'
  }
})
export default class MaskedInputDirective {
  private inputElement:HTMLInputElement;
  public control: any;

  @Input('textMask') textMaskConfig = {
    mask: '',
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
    onReject: undefined,
    onAccept: undefined
  };

  constructor(inputElement: ElementRef, private ngControl: NgControl) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    const {placeholderChar} = this.textMaskConfig;
    this.control = createTextMaskInputElement(Object.assign({
      inputElement: this.inputElement,
      placeholderChar,
    }, this.textMaskConfig));

    setTimeout(() => this.onInput());
  }

  onInput() {
    this.control.update();
    this.ngControl.viewToModelUpdate(this.inputElement.value);
  }
}

export {MaskedInputDirective as Directive}
