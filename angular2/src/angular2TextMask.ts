import {
  convertMaskToPlaceholder,
  safeSetSelection,
  processComponentChanges
} from '../../core/src/index'

import {Directive, ElementRef, Input} from 'angular2/core'
import {NgModel} from 'angular2/common'

@Directive({
  selector: 'input[textMask][ngModel]',
  host: {
    '[placeholder]': 'originalPlaceholder',
    '(input)': 'onInput($event.target.value)',
    '(keyup)': 'updateModel($event.target.value)'
  }
})
export default class MaskedInputDirective {
  private conformedInput:string
  private placeholder:string
  private originalPlaceholder:string
  private inputElement:HTMLInputElement

  @Input('textMask') textMaskConfig = {mask: '', guide: true}

  constructor(el:ElementRef, public model:NgModel) {
    this.inputElement = el.nativeElement
  }

  ngOnInit({mask = this.textMaskConfig.mask} = {}) {
    this.conformedInput = ''
    this.placeholder = convertMaskToPlaceholder(mask)
    this.originalPlaceholder = (this.originalPlaceholder !== undefined) ?
      this.originalPlaceholder :
      this.placeholder
  }

  ngOnChanges({textMaskConfig}) {
    const {
      currentValue: {mask: currentMask},
      previousValue: {mask: previousMask},
      currentValue: {guide: currentGuide},
      previousValue: {guide: previousGuide}
    } = textMaskConfig

    if (currentMask !== previousMask || currentGuide !== previousGuide) {
      this.ngOnInit({mask: currentMask})
      this.model.valueAccessor.writeValue('')
    }
  }

  onInput(userInput = '') {
    const {
      textMaskConfig: {mask, guide},
      placeholder, 
      conformedInput: previousConformedInput
    } = this
    const {
      adjustedCaretPosition,
      conformedInput
    } = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      guide,
      currentCaretPosition: this.inputElement.selectionStart
    })

    this.conformedInput = conformedInput
    this.model.valueAccessor.writeValue(conformedInput)
    safeSetSelection(this.inputElement, adjustedCaretPosition)
  }

  updateModel(conformedUserInput) {
    this.model.viewToModelUpdate(conformedUserInput)
  }
}

export {MaskedInputDirective as Directive}

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../core/src/index'
