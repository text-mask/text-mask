import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'
import retainCharsPositions from './retainCharsPositions.js'

export default function createTextMaskInputElement({
  inputElement,
  mask: providedMask,
  guide,
  pipe = defaultPipe,
  placeholderChar,
  onAccept,
  onReject,
  shouldRetainCharsPositions = false
}) {
  const state = {previousConformedInput: ''}

  let placeholder = ''
  let mask

  if (isString(providedMask)) {
    placeholder = convertMaskToPlaceholder(providedMask, placeholderChar)
  }

  if (inputElement.placeholder === '') {
    inputElement.setAttribute('placeholder', placeholder)
  }

  return {
    state,

    update(valueToConform = inputElement.value) {
      if (valueToConform === state.previousConformedInput) { return }

      const safeValueToConform = getSafeInputValue(valueToConform)

      if (typeof providedMask === 'function') {
        mask = providedMask(safeValueToConform)

        placeholder = convertMaskToPlaceholder(mask, placeholderChar)
      } else {
        mask = providedMask
      }

      const {selectionStart: currentCaretPosition} = inputElement
      const {previousConformedInput} = state
      const conformToMaskConfig = {previousConformedInput, guide, placeholderChar, placeholder}
      const {conformedInput, indexesOfAddedCharacters} = pipe({
        valueToConform: safeValueToConform,
        mask,
        conformToMask,
        conformToMaskConfig,
        currentCaretPosition,
        retainCharsPositions,
        shouldRetainCharsPositions
      })

      const adjustedCaretPosition = adjustCaretPosition({
        conformedInput,
        previousConformedInput,
        rawInput: safeValueToConform,
        placeholderChar,
        placeholder,
        currentCaretPosition,
        indexesOfAddedCharacters
      })
      const valueShouldBeEmpty = conformedInput === placeholder && adjustedCaretPosition === 0
      const finalConformedInput = (valueShouldBeEmpty) ? '' : conformedInput
      const isDeletion = safeValueToConform.length < previousConformedInput.length

      if (typeof onAccept === 'function' && finalConformedInput !== previousConformedInput) {
        onAccept()
      }

      if (
        typeof onReject === 'function' &&
        conformedInput === previousConformedInput &&
        isDeletion === false &&
        currentCaretPosition <= mask.length
      ) {
        onReject({userInput: safeValueToConform})
      }

      inputElement.value = finalConformedInput
      state.previousConformedInput = finalConformedInput
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

function defaultPipe({valueToConform, mask, conformToMask, conformToMaskConfig}) {
  return {
    conformedInput: conformToMask(valueToConform, mask, conformToMaskConfig),
    indexesOfAddedCharacters: []
  }
}
