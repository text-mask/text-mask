import {convertMaskToPlaceholder, getFirstChange} from './utilities.js'
import {placeholderCharacter as placeholderChar} from './constants.js'

export default function adjustCaretPosition({
  previousConformedInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0,
}) {
  const {output: conformedInput = '', meta = {}} = conformToMaskResults
  const {input: rawInput = '', mask = '', guide = true} = meta
  const placeholder = convertMaskToPlaceholder(mask)
  const isAddition = !(
    conformedInput.length < previousConformedInput.length ||
    rawInput.length < previousConformedInput.length
  )
  const indexOfFirstChange = getFirstChange(previousConformedInput, rawInput)
  const isPaste = Math.abs(previousConformedInput.length - rawInput.length) > 1

  // When user modifies string from (444) 444-44__ to (444) 444-444_ while caret is at position
  // 2, `indexOfChange` would be 12. This is what I call ambiguous change
  const isAmbiguousChange = (indexOfFirstChange - currentCaretPosition) > 1

  // For a mask like (111), if the `previousConformedInput` is (1__) and user attempt to enter
  // `f` so the `rawInput` becomes (1f__), the new `conformedInput` would be (1__), which is the
  // same as the original `previousConformedInput`. We handle this case differently for caret
  // positioning.
  const possiblyHasRejectedChar = isAddition && previousConformedInput === conformedInput

  // If operation is paste, that is input went from (___) ___-___ to (650) 333-3__ in one change,
  // we want to find the next suitable caret position in the `conformedInput` string. Otherwise,
  // we always want to use the `placeholder` for our target for caret placement.
  const baseTargetForCaretPlacement = (isPaste) ? conformedInput : placeholder

  // This is true when user attempts to insert a character in a non-placeholder position.
  // For example, for mask (111) 111-1111, if the user tries to enter a character 5 at position 0
  // which is before the first `(`, this flag would be `true`.
  const isCharInsertedInNonPlaceholderIndex = (
    placeholder[indexOfFirstChange] !== placeholderChar
  )

  let startingSearchIndex = currentCaretPosition

  // If the change is ambiguous. Our best bet is to start searching for the next possible caret
  // position from the current caret position
  if (isAmbiguousChange) {
    startingSearchIndex = currentCaretPosition

  // Else if the operation is paste, we start from the beginning of the `conformedInput` string
  // and look for the next possible caret position
  } else if (isPaste) {
    startingSearchIndex = 0

  // Else if it has rejected character, we wanna go back a step and start searching from
  // there because the caret will have advanced after entering the rejected character
  } else if (possiblyHasRejectedChar) {
    startingSearchIndex--

  // Else if none of the conditions above is true, and the operation is addition, let's start the
  // search from the first `placeholderChar` position.
  } else if (isAddition) {
    for (let i = currentCaretPosition; i < placeholder.length; i++) {
      if (placeholder[i] === placeholderChar) {
        startingSearchIndex = i + (isCharInsertedInNonPlaceholderIndex ? 1 : 0)
        break
      }
    }
  }
  
  // Here for the most part, we just do the search.
  // If `isAddition`, we seek forward. Otherwise we seek back.
  if (isAddition) {
    for (let i = startingSearchIndex; i < baseTargetForCaretPlacement.length; i++) {
      if (baseTargetForCaretPlacement[i] === placeholderChar) {
        return (i > conformedInput.length) ? conformedInput.length : i
      }
    }
  } else {
    for (let i = startingSearchIndex; i > 0; i--) {
      if (
        baseTargetForCaretPlacement[i] === placeholderChar ||
        baseTargetForCaretPlacement[i - 1] === placeholderChar
      ) {
        return i
      }
    }
  }

  return (isAddition) ? conformedInput.length : 0
}
