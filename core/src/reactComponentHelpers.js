// This is a temporary file. I made it so that I can update React Text Mask without breaking
// other components. I'll have to merge it back into the original `componentHelpers.js` later.

import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString} from './utilities.js'

export function processComponentChanges({
  userInput = '',
  componentPlaceholder: placeholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  validator,
  currentCaretPosition,
  placeholderCharacter: placeholderChar
}) {
  const conformToMaskResults = conformToMask(
    userInput,
    mask,
    {previousConformedInput, guide, placeholderChar, validator}
  )
  const {output: outputOfConformToMask} = conformToMaskResults
  const adjustedCaretPosition = (currentCaretPosition !== undefined) ?
    adjustCaretPosition({
      previousConformedInput,
      conformToMaskResults,
      currentCaretPosition,
      placeholderChar
    }) :
    undefined
  const valueShouldBeEmpty = outputOfConformToMask === placeholder && adjustedCaretPosition === 0
  const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask

  return {conformedInput, adjustedCaretPosition}
}

export function getComponentInitialState({mask, placeholderChar, value: inputValue}) {
  if (inputValue !== undefined) {
    checkInputValueType(inputValue)
  }

  return {
    conformedInput: '',
    adjustedCaretPosition: 0,
    componentPlaceholder: convertMaskToPlaceholder({mask, placeholderChar})
  }
}

export function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

export function checkInputValueType(inputValue) {
  if (!isString(inputValue)) {
    console.log('Text Mask received', inputValue) // eslint-disable-line
    throw new Error('The `value` provided to Text Mask needs to be of type string.')
  }
}
