///<reference path="../typings/index.d.ts"/>

import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/componentHelpers'

import {Directive, ElementRef, Input} from '@angular/core'
import {NgModel} from '@angular/common'

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

  @Input('textMask') textMaskConfig = {
    mask: '',
    guide: true,
    placeholderCharacter: undefined,
    validator: undefined
  }

  constructor(el:ElementRef, public model:NgModel) {
    this.inputElement = el.nativeElement
  }

  setComponentInitialState({inputValue, mask, guide, placeholderChar, validator}) {
    const {conformedInput, componentPlaceholder} = getComponentInitialState({
      inputValue,
      validator,
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

  ngOnInit({
    mask,
    validator,
    guide,
    placeholderCharacter: placeholderChar
  } = this.textMaskConfig) {
    this.setComponentInitialState({
      inputValue: this.model.viewModel,
      validator,
      mask,
      guide,
      placeholderChar
    })
  }

  ngOnChanges({textMaskConfig}) {
    const {
      currentValue: {
        mask: currentMask,
        guide: currentGuide,
        validator: currentValidator,
        placeholderCharacter: currentPlaceholderChar
      },

      previousValue: {
        mask: previousMask,
        guide: previousGuide,
        validator: previousValidator,
        placeholderCharacter: previousPlaceholderChar
      },
    } = textMaskConfig

    if (
      currentMask !== previousMask ||
      currentGuide !== previousGuide ||
      currentPlaceholderChar !== previousPlaceholderChar,
      currentValidator !== previousValidator
    ) {
      this.setComponentInitialState({
        inputValue: this.model.viewModel,
        mask: currentMask,
        guide: currentGuide,
        validator: currentValidator,
        placeholderChar: currentPlaceholderChar
      })
    }
  }

  onInput(userInput = '') {
    const {
      textMaskConfig: {mask, guide, placeholderCharacter: placeholderChar},
      componentPlaceholder,
      conformedInput: previousConformedInput
    } = this
    const {adjustedCaretPosition, conformedInput} = processComponentChanges({
      userInput,
      componentPlaceholder,
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
