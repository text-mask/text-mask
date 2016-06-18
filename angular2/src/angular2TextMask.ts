///<reference path="../typings/index.d.ts"/>

import {Directive, ElementRef, Input} from '@angular/core'
import {NgControl} from '@angular/common'
import maskInput from '../../vanilla/src/vanillaTextMask'

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

  constructor(private inputElement: ElementRef, private ngControl: NgControl) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    const {mask, guide, placeholderCharacter, validator} = this.textMaskConfig

    this.control = maskInput({
      inputElement: this.inputElement,
      mask,
      guide,
      placeholderCharacter,
      validator
    }, false)
  }

  onInput() {
    this.control.update()
    this.ngControl.viewToModelUpdate(this.inputElement.value)
  }
}

export {MaskedInputDirective as Directive}
