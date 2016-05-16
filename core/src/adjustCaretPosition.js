import {convertMaskToPlaceholder, getIndexOfFirstChange} from './utilities.js'
import {placeholderCharacter as placeholderChar} from './constants.js'

export default function adjustCaretPosition({
  previousConformedInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0,
}) {
  if (currentCaretPosition === 0) { return 0 }

  const {output: conformedInput = '', meta = {}} = conformToMaskResults
  const {input: rawInput = '', mask = ''} = meta

  // Tells us the index of the first change. For (438) 394-4938 to (38) 394-4938, that would be 1
  const indexOfFirstChange = getIndexOfFirstChange(previousConformedInput, rawInput)

  // When user modifies string from (444) 444-44__ to (444) 444-444_ while caret is at position
  // 2, `indexOfChange` would be 12. This is what I call ambiguous change
  const isAmbiguousChange = (indexOfFirstChange - currentCaretPosition) > 1

  // If the change is ambiguous. Our best bet is to keep the caret where it is.
  if (isAmbiguousChange) { return currentCaretPosition }

  // Convert mask (111) 111-1111 to (___) ___-___.
  const placeholder = convertMaskToPlaceholder(mask)

  // True when user tries to delete a character from input. Like, (438) 394-4938 to (38) 394-4938
  const isAddition = !(rawInput.length < previousConformedInput.length)

  // This is true when user has entered more than one character per iteration. This only happens
  // if user has pasted into the input field.
  const isPaste = Math.abs(previousConformedInput.length - rawInput.length) > 1

  // For a mask like (111), if the `previousConformedInput` is (1__) and user attempts to enter
  // `f` so the `rawInput` becomes (1f__), the new `conformedInput` would be (1__), which is the
  // same as the original `previousConformedInput`. We handle this case differently for caret
  // positioning.
  const possiblyHasRejectedChar = isAddition && (
    previousConformedInput === conformedInput ||
    conformedInput === placeholder
  )

  // There's an edge case when the user enters the first character of the mask and it's a mask
  // delimiter. For example, mask (111) 111-1111, and user enters `(`. In this case, the
  // `previousConformedInput` would be empty string and conformedInput would be `(___) ___-____`
  // This case is treated differently in caret positioning.
  const onlyEnteredAMaskDelimiter = previousConformedInput === '' && conformedInput === placeholder

  // If operation is paste, that is input goes from (___) ___-___ to (650) 333-3__ in one change,
  // we want to find the next suitable caret position in the `conformedInput` string. Otherwise,
  // we always want to use the `placeholder` for our target for caret placement.
  const baseTargetForCaretPlacement = (isPaste) ? conformedInput : placeholder

  // This is true when user attempts to insert a character in a non-placeholder position.
  // For example, for mask (111) 111-1111, if the user tries to enter a character 5 at position 0
  // which is before the first `(`, this flag would be `true`.
  const isCharInsertedInNonPlaceholderIndex = placeholder[indexOfFirstChange] !== placeholderChar

  // We can reasonably expect that we will adjust the caret position starting from the
  // original/current caret position
  let startingSearchIndex = currentCaretPosition

  // Else if the operation is paste, we start from the beginning of the `conformedInput` string
  // and look for the next sensible caret position, which is where a `placeholderChar` would be
  if (isPaste) {
    startingSearchIndex = 0

  // Else if it has rejected character, we wanna go back a step and start searching from
  // there because the caret will have advanced after entering the rejected character
  } else if (possiblyHasRejectedChar) {
    startingSearchIndex--

  // Else if none of the conditions above is true, and the operation is addition, let's start the
  // search from the first `placeholderChar` position.
  } else if (isAddition) {
    for (let i = currentCaretPosition; i < placeholder.length; i++) {
      const needsAdjustmentByOne = (
        isCharInsertedInNonPlaceholderIndex &&
        onlyEnteredAMaskDelimiter === false
      )

      if (placeholder[i] === placeholderChar) {
        // So, we found the next `placeholderChar`. But we need to adjust by `1` if the user
        // made their change in a none-placeholder character position and if that change is not
        // just a mask delimiter.
        startingSearchIndex = i + (needsAdjustmentByOne ? 1 : 0)
        break
      }
    }
  }

  // At this point, we have determined a reasonable index from which we can begin searching for
  // the correct caret position and we've put it in `startingSearchIndex`. And we've determined
  // the base in which to look for the caret position, whether `placeholder` or `conformedInput`.
  //
  // Now, if `isAddition`, we seek forward. Otherwise we seek back.
  if (isAddition) {
    for (let i = startingSearchIndex; i <= baseTargetForCaretPlacement.length; i++) {
      if (
        // If we're adding, we can position the caret at the next placeholder character.
        baseTargetForCaretPlacement[i] === placeholderChar ||

        // This is the end of the target. We cannot move any further. Let's put the caret there.
        i === baseTargetForCaretPlacement.length
      ) {
        // Limiting `i` to the length of the `conformedInput` is a brute force fix for caret
        // positioning in `guide === false` mode. There are a few edge cases which are
        // solved by this. To see what happens without it, uncomment the line below and run
        // the test suite

        // return i
        return (i > conformedInput.length) ? conformedInput.length : i
      }
    }
  } else {
    for (let i = startingSearchIndex; i >= 0; i--) {
      // If we're deleting, we stop the caret right before the placeholder character.
      // For example, for mask `(111) 11`, current conformed input `(456) 86`. If user
      // modifies input to `(456 86`. That is, they deleted the `)`, we place the caret
      // right after the first `6`
      if (
        baseTargetForCaretPlacement[i - 1] === placeholderChar ||

        // This is the beginning of the target. We cannot move any further.
        // Let's put the caret there.
        i === 0
      ) {
        return i
      }
    }
  }
}
