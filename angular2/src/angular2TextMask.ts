///<reference path="../typings/index.d.ts"/>

import {Directive, ElementRef, Input} from '@angular/core'
import {NgModel} from '@angular/common'
import maskInput from '../../vanilla/src/vanillaTextMask'

@Directive({
  selector: 'input[textMask]',
  host: {
    '(keyup)': 'updateModel($event.target.value)'
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

  constructor(inputElement: ElementRef, public model: NgModel) {
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
    })
  }

  ngOnDestroy() {
    this.control.destroy()
  }

  updateModel(value) {
    this.model.viewToModelUpdate(value)
  }
}

export {MaskedInputDirective as Directive}
