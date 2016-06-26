///<reference path="../typings/index.d.ts"/>

import {Directive, ElementRef, Input} from '@angular/core'
import {NgControl} from '@angular/common'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

@Directive({
  selector: 'input[textMask]',
  host: {
    '(input)': 'onInput()'
  }
})
export default class MaskedInputDirective {
  private inputElement:HTMLInputElement
  public control: any

  @Input('textMask') textMaskConfig = {
    mask: '',
    guide: true,
    placeholderCharacter: undefined,
    validator: undefined,
    onReject: undefined,
    onAccept: undefined
  }

  constructor(inputElement: ElementRef, private ngControl: NgControl) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    const {placeholderCharacter: placeholderChar} = this.textMaskConfig

    this.control = createTextMaskInputElement(Object.assign({
      inputElement: this.inputElement,
      placeholderChar,
    }, this.textMaskConfig))
  }

  onInput() {
    this.control.update()
    this.ngControl.viewToModelUpdate(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
