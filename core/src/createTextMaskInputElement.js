import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'
import {placeholderCharacter} from './constants.js'

// This component orchestrates the flow of data through the various Text Mask functions
// and can update the DOM input element.
export default function createTextMaskInputElement({
  inputElement,
  mask: providedMask,
  guide,
  validator,
  placeholderChar = placeholderCharacter,
  onAccept,
  onReject
}) {
  // We need to keep a state
  const state = {previousConformedInput: ''}
  const caretTrapsRegex = /\[\]/g
  
  let componentPlaceholder = ''
  let mask
  let maskPotentiallyWithCaretTraps
  let hasCaretTraps

  if (isString(providedMask)) {
    componentPlaceholder = convertMaskToPlaceholder(providedMask, placeholderChar)
  }

  if (inputElement.placeholder === '') {
    inputElement.setAttribute('placeholder', componentPlaceholder)
  }

  return {
    state,

    update(valueToConform = inputElement.value) {
      if (valueToConform === state.previousConformedInput) { return }

      const {selectionStart: currentCaretPosition} = inputElement
      
      if (typeof providedMask === 'function') {
        maskPotentiallyWithCaretTraps = providedMask({
          valueToConform, 
          currentCaretPosition,
          placeholderCharacter: placeholderChar
        })
        mask = maskPotentiallyWithCaretTraps.replace(caretTrapsRegex, '')
        hasCaretTraps = mask !== maskPotentiallyWithCaretTraps

        componentPlaceholder = convertMaskToPlaceholder(mask, placeholderChar)
      } else {
        mask = providedMask
      }

      const {previousConformedInput} = state
      const safeValueToConform = getSafeInputValue(valueToConform)
      const conformToMaskConfig = {previousConformedInput, guide, placeholderChar, validator}
      const conformToMaskResults = conformToMask(safeValueToConform, mask, conformToMaskConfig)
      const {output: outputOfConformToMask} = conformToMaskResults
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedInput,
        conformToMaskResults,
        currentCaretPosition,
        placeholderChar,
        maskWithCaretTraps: (hasCaretTraps) ? maskPotentiallyWithCaretTraps : undefined
      })
      const valueShouldBeEmpty = (
        outputOfConformToMask === componentPlaceholder && adjustedCaretPosition === 0
      )
      const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask
      const isDeletion = safeValueToConform.length < previousConformedInput.length

      if (typeof onAccept === 'function' && conformedInput !== previousConformedInput) {
        onAccept()
      }

      if (
        typeof onReject === 'function' &&
        conformedInput === previousConformedInput &&
        isDeletion === false &&
        currentCaretPosition <= mask.length
      ) {
        onReject()
      }

      inputElement.value = conformedInput
      state.previousConformedInput = conformedInput
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
    throw new Error(
      "The 'value' provided to Text Mask needs to be a string or a number. The value " +
      `received was:\n\n ${JSON.stringify(inputValue)}`
    )
  }
}
