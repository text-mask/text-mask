import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'

export function processComponentChanges({
  userInput = '',
  placeholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  currentCaretPosition = 0,
  placeholderChar
}) {
  const conformToMaskResults = conformToMask(
    userInput,
    mask,
    {previousConformedInput, guide, placeholderChar}
  )
  const {output: outputOfConformToMask} = conformToMaskResults
  const adjustedCaretPosition = adjustCaretPosition({
    previousConformedInput,
    conformToMaskResults,
    currentCaretPosition,
    placeholderChar
  })
  const valueShouldBeEmpty = outputOfConformToMask === placeholder && adjustedCaretPosition === 0
  const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask

  return {conformedInput, adjustedCaretPosition}
}

export function getComponentInitialState({inputValue, mask, guide, placeholderChar}) {
  const safeInputValue = getSafeInputValue(inputValue)
  const needsToBeConformed = safeInputValue.length > 0
  const {output: conformedInput} = (needsToBeConformed) ?
    conformToMask(safeInputValue, mask, {guide, previousConformedInput: '', placeholderChar}) :
    {output: ''}

  return {
    conformedInput,
    adjustedCaretPosition: 0,
    componentPlaceholder: convertMaskToPlaceholder({mask, placeholderChar})
  }
}

export function safeSetSelection(element, selectionPosition) {
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
