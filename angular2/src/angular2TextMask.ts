import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/componentHelpers'

import {Directive, ElementRef, Input} from 'angular2/core'
import {NgModel} from 'angular2/common'

@Directive({
  selector: 'input[textMask][ngModel]',
  host: {
    '(input)': 'onInput($event.target.value)',
    '(keyup)': 'updateModel($event.target.value)'
  }
})
export default class MaskedInputDirective {
  private conformedInput:string
  private componentPlaceholder:string
  private inputElement:HTMLInputElement

  @Input('textMask') textMaskConfig = {mask: '', guide: true, placeholderCharacter: undefined}

  constructor(el:ElementRef, public model:NgModel) {
    this.inputElement = el.nativeElement
  }

  setComponentInitialState({inputValue, mask, guide, placeholderChar}) {
    const {conformedInput, componentPlaceholder} = getComponentInitialState({
      inputValue,
      mask,
      guide,
      placeholderChar
    })

    this.conformedInput = conformedInput
    this.componentPlaceholder = componentPlaceholder

    this.inputElement.placeholder = (this.inputElement.placeholder !== undefined) ?
      this.inputElement.placeholder :
      this.componentPlaceholder

    this.model.valueAccessor.writeValue(conformedInput)
    this.updateModel(conformedInput)
  }

  ngOnInit({mask, guide, placeholderCharacter: placeholderChar} = this.textMaskConfig) {
    this.setComponentInitialState({inputValue: this.model.viewModel, mask, guide, placeholderChar})
  }

  ngOnChanges({textMaskConfig}) {
    const {
      currentValue: {
        mask: currentMask,
        guide: currentGuide,
        placeholderCharacter: currentPlaceholderChar
      },

      previousValue: {
        mask: previousMask,
        guide: previousGuide,
        placeholderCharacter: previousPlaceholderChar
      },
    } = textMaskConfig

    if (
      currentMask !== previousMask ||
      currentGuide !== previousGuide ||
      currentPlaceholderChar !== previousPlaceholderChar
    ) {
      this.setComponentInitialState({
        inputValue: this.model.viewModel,
        mask: currentMask,
        guide: currentGuide,
        placeholderChar: currentPlaceholderChar
      })
    }
  }

  onInput(userInput = '') {
    const {
      textMaskConfig: {mask, guide, placeholderCharacter: placeholderChar},
      componentPlaceholder: placeholder,
      conformedInput: previousConformedInput
    } = this
    const {adjustedCaretPosition, conformedInput} = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      guide,
      placeholderChar,
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

export {default as conformToMask} from '../../core/src/conformToMask'
export {convertMaskToPlaceholder} from '../../core/src/utilities'
