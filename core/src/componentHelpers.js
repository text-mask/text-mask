import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'

export function processComponentChanges({
  userInput = '',
  placeholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  currentCaretPosition = 0
}) {
  const conformToMaskResults = conformToMask(userInput, mask, {previousConformedInput, guide})
  const {output: conformToMaskOutput} = conformToMaskResults
  const adjustedCaretPosition = adjustCaretPosition({
    previousConformedInput,
    conformToMaskResults,
    currentCaretPosition
  })
  const valueShouldBeEmpty = conformToMaskOutput === placeholder && adjustedCaretPosition === 0
  const conformedInput = (valueShouldBeEmpty) ? '' : conformToMaskOutput

  return {conformedInput, adjustedCaretPosition}
}

export function getComponentInitialState({inputValue, mask, guide}) {
  const safeInputValue = getSafeInputValue(inputValue)
  const needsToBeConformed = safeInputValue.length > 0

  return {
    conformedInput: (needsToBeConformed) ?
      conformToMask(safeInputValue, mask, {guide, previousConformedInput: ''}).output :
      '',
    adjustedCaretPosition: 0,
    componentPlaceholder: convertMaskToPlaceholder(mask)
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
