///<reference path="../typings/index.d.ts"/>

import {Directive, ElementRef, Input} from '@angular/core'
import {NgControl} from '@angular/common'
import createComponent from '../../core/src/createComponent'

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
    validator: undefined
  }

  constructor(inputElement: ElementRef, private ngControl: NgControl) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    const {mask, guide, placeholderCharacter: placeholderChar, validator} = this.textMaskConfig

    this.control = createComponent({
      inputElement: this.inputElement,
      mask,
      guide,
      placeholderChar,
      validator
    })
  }

  onInput() {
    this.control.update()
    this.ngControl.viewToModelUpdate(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
