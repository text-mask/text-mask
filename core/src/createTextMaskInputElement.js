import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'

export default function createTextMaskInputElement({
  inputElement,
  mask: providedMask,
  guide,
  validator,
  placeholderChar,
  onAccept,
  onReject
}) {
  const state = {previousConformedValue: ''}

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

    update(rawValue = inputElement.value) {
      if (rawValue === state.previousConformedValue) { return }

      const safeRawValue = getSafeRawValue(rawValue)

      if (typeof providedMask === 'function') {
        mask = providedMask(safeRawValue)

        placeholder = convertMaskToPlaceholder(mask, placeholderChar)
      } else {
        mask = providedMask
      }

      const {selectionStart: currentCaretPosition} = inputElement
      const {previousConformedValue} = state
      const conformToMaskConfig = {
        previousConformedValue,
        guide,
        placeholderChar,
        validator,
        placeholder
      }
      const conformedValue = conformToMask(safeRawValue, mask, conformToMaskConfig)
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedValue,
        conformedValue,
        placeholder,
        rawValue: safeRawValue,
        currentCaretPosition,
        placeholderChar
      })
      const inputValueShouldBeEmpty = conformedValue === placeholder && adjustedCaretPosition === 0
      const inputElementValue = (inputValueShouldBeEmpty) ? '' : conformedValue
      const isDeletion = safeRawValue.length < previousConformedValue.length

      inputElement.value = inputElementValue
      state.previousConformedValue = inputElementValue
      safeSetSelection(inputElement, adjustedCaretPosition)

      if (typeof onAccept === 'function' && inputElementValue !== previousConformedValue) {
        onAccept()
      }

      if (
        typeof onReject === 'function' &&
        inputElementValue === previousConformedValue &&
        isDeletion === false &&
        currentCaretPosition <= mask.length
      ) {
        onReject({rawValue: safeRawValue})
      }
    }
  }
}

function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

function getSafeRawValue(inputValue) {
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
