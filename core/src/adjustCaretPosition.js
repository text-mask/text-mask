import {convertMaskToPlaceholder, getFirstChange} from './utilities.js'
import {placeholderCharacter} from './constants.js'

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
  const isMultiCharacterChange = Math.abs(previousConformedInput.length - rawInput.length) > 1
  const possiblyHasRejectedCharacter = previousConformedInput === conformedInput
  const startingSearchIndex = (isMultiCharacterChange) ?
    getFirstChange(previousConformedInput, conformedInput) :
    (isAddition) ?
      currentCaretPosition - ((possiblyHasRejectedCharacter) ? 1 : 0) :
      currentCaretPosition
  const baseForComparison = (
    isMultiCharacterChange ||
    (isAddition && placeholder[currentCaretPosition - 1] !== placeholderCharacter)
  ) ? conformedInput : placeholder

  if (isAddition) {
    for (let i = startingSearchIndex; i < baseForComparison.length; i++) {
      if (baseForComparison[i] === placeholderCharacter) {
        return i
      }
    }
  } else {
    for (let i = startingSearchIndex; i > 0; i--) {
      if (
        baseForComparison[i] === placeholderCharacter ||
        baseForComparison[i - 1] === placeholderCharacter
      ) {
        return i
      }
    }
  }

  return (isAddition) ? conformedInput.length : 0
}
