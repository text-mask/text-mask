import {convertMaskToPlaceholder, getFirstChange} from './utilities.js'
import {placeholderCharacter as placeholderChar} from './constants.js'

export default function adjustCaretPosition({
  previousConformedInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0,
}) {
  const {output: conformedInput = '', meta = {}} = conformToMaskResults
  const {input: rawInput = '', mask = ''} = meta
  const placeholder = convertMaskToPlaceholder(mask)
  const isAddition = !(
    conformedInput.length < previousConformedInput.length ||
    rawInput.length < previousConformedInput.length
  )
  const indexOfFirstChange = getFirstChange(previousConformedInput, rawInput)
  const isMultiCharChange = Math.abs(previousConformedInput.length - rawInput.length) > 1
  const isAmbiguousChange = (indexOfFirstChange - currentCaretPosition) > 1
  const possiblyHasRejectedChar = previousConformedInput === conformedInput
  const baseForComparison = (isMultiCharChange) ? conformedInput : placeholder
  const isCharInsertedInNonPlaceholderIndex = (placeholder[indexOfFirstChange] !== placeholderChar)

  let startingSearchIndex = currentCaretPosition

  if (isAmbiguousChange) {
    startingSearchIndex = currentCaretPosition
  } else if (isMultiCharChange) {
    startingSearchIndex = 0
  } else if (isAddition) {
    if (possiblyHasRejectedChar) {
      startingSearchIndex--
    } else {
      for (let i = currentCaretPosition; i < placeholder.length; i++) {
        if (placeholder[i] === placeholderChar) {
          startingSearchIndex = i + (isCharInsertedInNonPlaceholderIndex ? 1 : 0)
          break
        }
      }
    }
  }

  if (isAddition) {
    for (let i = startingSearchIndex; i < baseForComparison.length; i++) {
      if (baseForComparison[i] === placeholderChar) {
        return (i > conformedInput.length) ? conformedInput.length : i
      }
    }
  } else {
    for (let i = startingSearchIndex; i > 0; i--) {
      if (
        baseForComparison[i] === placeholderChar ||
        baseForComparison[i - 1] === placeholderChar
      ) {
        return i
      }
    }
  }

  return (isAddition) ? conformedInput.length : 0
}
