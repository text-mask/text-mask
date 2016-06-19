import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'

export default function createComponent({
  inputElement,
  mask,
  guide,
  validator,
  placeholderChar
}) {
  const state = {conformedInput: ''}
  const componentPlaceholder = convertMaskToPlaceholder({mask, placeholderChar})

  inputElement.placeholder = (inputElement.placeholder !== '') ?
    inputElement.placeholder :
    componentPlaceholder

  return {
    state,

    update(valueToConform = inputElement.value) {
      if (valueToConform === state.conformedInput) { return }

      const {selectionStart: currentCaretPosition} = inputElement
      const {conformedInput: previousConformedInput} = state
      const safeValueToConform = getSafeInputValue(valueToConform)
      const conformToMaskConfig = {previousConformedInput, guide, placeholderChar, validator}
      const conformToMaskResults = conformToMask(safeValueToConform, mask, conformToMaskConfig)
      const {output: outputOfConformToMask} = conformToMaskResults
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedInput,
        conformToMaskResults,
        currentCaretPosition,
        placeholderChar
      })
      const valueShouldBeEmpty = (
        outputOfConformToMask === componentPlaceholder && adjustedCaretPosition === 0
      )
      const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask

      state.conformedInput = conformedInput
      inputElement.value = conformedInput
      safeSetSelection(inputElement, adjustedCaretPosition)
    }
  }
}

function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

function getSafeInputValue(inputValue) {
  if (isString(inputValue)) {
    return inputValue
  } else if (isNumber(inputValue)) {
    return String(inputValue)
  } else if (inputValue === undefined || inputValue === null) {
    return ''
  } else {
    console.log('Text Mask received', inputValue) // eslint-disable-line
    throw new Error('The `value` provided to Text Mask needs to be a string or a number.')
  }
}
