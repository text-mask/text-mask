import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index'

import {Directive, ElementRef, Input} from 'angular2/core'
import {NgModel} from 'angular2/common'

@Directive({
  selector: 'input[textMask][ngModel]',
  host: {
    '[placeholder]': 'placeholder',
    '(input)': 'onInput($event.target.value)',
    '(keyup)': 'updateModel($event.target.value)'
  }
})
export default class MaskedInputDirective {
  private inputElement:HTMLInputElement
  private previousValue = ''
  private conformToMaskResults = {output: ''}
  private currentCaretPosition:number = null
  private placeholder = ''

  @Input('textMask') textMaskConfig = {mask: ''}

  constructor(el:ElementRef, public model:NgModel) {
    this.inputElement = el.nativeElement
  }

  ngOnChanges() {
    this.placeholder = convertMaskToPlaceholder(this.textMaskConfig.mask)
    this.model.valueAccessor.writeValue('')
  }

  conformUserInputToMask(userInput = '') {
    this.conformToMaskResults = conformToMask(userInput, this.textMaskConfig.mask)
    this.currentCaretPosition = this.inputElement.selectionStart

    return this.conformToMaskResults.output
  }

  adjustCaretPositionAfterUserInput() {
    const caretPosition = adjustCaretPosition({
      previousInput: this.previousValue,
      conformToMaskResults: this.conformToMaskResults,
      currentCaretPosition: this.currentCaretPosition
    })

    this.previousValue = (
      this.conformToMaskResults.output ||
      this.previousValue
    )

    this.inputElement.setSelectionRange(caretPosition, caretPosition)
  }

  onInput(userInput = '') {
    const conformedString = this.conformUserInputToMask(userInput)

    if (conformedString === this.placeholder) {
      this.model.valueAccessor.writeValue('')
    } else {
      this.model.valueAccessor.writeValue(conformedString)
    }

    this.adjustCaretPositionAfterUserInput()
  }

  updateModel(userInput) {
    this.model.viewToModelUpdate(userInput)
  }
}

export {MaskedInputDirective as Directive}

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index'
