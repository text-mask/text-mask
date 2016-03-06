import {convertMaskToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getChangeDetails from './getChangeDetails.js'

export default function adjustCaretPosition({
  previousInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0
}) {
  // ensure sane argument values
  conformToMaskResults.input = conformToMaskResults.input || ''
  conformToMaskResults.output = conformToMaskResults.output || ''
  conformToMaskResults.mask = conformToMaskResults.mask || ''

  const placeholder = convertMaskToPlaceholder(conformToMaskResults.mask)

  // First determine if the operation is deletion or addition to know whether we will be
  // seeking to move the caret forward or back.
  const isDeletion = (
    // If previous input is the placeholder, then any change to it is addition.
    previousInput !== placeholder &&
    (
      // if the conformed string or the input to be conformed is smaller than
      // previous input, then the operation is deletion.
      (conformToMaskResults.output.length < previousInput.length) ||
      (conformToMaskResults.input.length < previousInput.length)
    )
  )

  // is addition...
  if (isDeletion === false) {

    // if previous input and conformToMaskResults.output are exactly the same, it means
    // adjustCaretPosition was called after conformToMask rejected a character
    if (previousInput === conformToMaskResults.output) {

      // in that case, revert movement of the caret
      return currentCaretPosition - 1

    // previous input is different from conformToMaskResults.output, so we need to do some work
    } else {
      const changeDetails = getChangeDetails(
        previousInput || placeholder,
        conformToMaskResults.output
      )

      // if the index of the last changed character is ahead of current caret position by more
      // than one, then an ambiguous change happened.
      // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was last added.
      // In that case, just return the current caret position unmodified.
      if ((changeDetails.indexOfLastChange - currentCaretPosition) > 1) {
        return currentCaretPosition
      }

      // otherwise, starting at the position right after the last added character, seek the next
      // placeholder where we can position the caret
      for (let i = changeDetails.indexOfLastChange + 1; i < placeholder.length; i++) {
        if (placeholder[i] === placeholderCharacter) {
          return i
        }
      }
    }

    // If the previous for-loop couldn't find a placeholder in which to position the caret, that
    // means there isn't a placeholder after the index of the last character, so just position
    // the caret at the end of the conformed string
    return conformToMaskResults.output.length

  // is deletion...
  } else if (isDeletion === true) {

    // if previous input and conformed string are the same, it means adjustCaretPosition is called
    // because the user is pressing the backspace to move the caret back
    if (previousInput === conformToMaskResults.output) {

      // if the caret is at a placeholder character position, it's okay to keep it where it is
      if (placeholder[currentCaretPosition] === placeholderCharacter) {
        return currentCaretPosition
      }

      // if the caret is anywhere that's not a placeholder character, seek back to the closest
      // placeholder character and place the caret right after it.
      for (let i = currentCaretPosition; i > 0; i--) {
        if (placeholder[i] === placeholderCharacter) {
          return i + 1 // It should be immediately after the next placeholder character
        }
      }

    // the user has actually deleted a character, so we need to do some work
    } else {
      const changeDetails = getChangeDetails(
        previousInput,
        conformToMaskResults.output
      )

      // if the index of the last changed character is more than one position far from the current
      // caret position, then an ambiguous change happened.
      // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was removed.
      // In that case, just return the current caret position unmodified.
      if ((changeDetails.indexOfFirstChange - currentCaretPosition) > 1) {
        return currentCaretPosition
      }

      // if the previous character in the placeholder is a placeholder character,
      // it's okay to keep the caret at its current position
      if (placeholder[currentCaretPosition - 1] === placeholderCharacter) {
        return currentCaretPosition
      }

      // otherwise, starting at the index of the first removed character, seek back until we find
      // a placeholder character at which to position the caret
      for (let i = changeDetails.indexOfFirstChange - 1; i > 0; i--) {
        if (placeholder[i] === placeholderCharacter) {
          return i + 1 // it should be immediately after the next placeholder character
        }
      }
    }

    // if we sought back and couldn't find a placeholder character at which to position the caret
    // we'd reach this point in the code. So, just place the caret at the beginning of the input
    return 0
  }
}
