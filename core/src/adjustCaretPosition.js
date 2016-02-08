import {diffChars} from 'diff'
import {convertMaskToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function adjustCaretPosition(
  previousUserInput = '',
  newUserInput = '',
  currentCaretPosition = 0,
  mask = ''
) {
  // Nothing changed. Keep caret at where it currently is.
  if (previousUserInput === newUserInput) { return currentCaretPosition }

  const diffResults = diffChars(previousUserInput, newUserInput)

  let addedCount = 0
  let removedCount = 0
  let charactersBeforeChangeOccurred = ''
  let indexOfWhereChangeOccurred = -1
  let newCharacterIsPlaceholderCharacter = null

  diffResults.forEach((result) => {
    charactersBeforeChangeOccurred += result.value

    if (result.added === true) {
      addedCount += result.count
      newCharacterIsPlaceholderCharacter = result.value === placeholderCharacter
      indexOfWhereChangeOccurred = (indexOfWhereChangeOccurred === -1) ?
        charactersBeforeChangeOccurred.length - 1 : indexOfWhereChangeOccurred
    }

    if (result.removed === true) {
      removedCount += result.count
      indexOfWhereChangeOccurred = (indexOfWhereChangeOccurred === -1) ?
        charactersBeforeChangeOccurred.length - 1 : indexOfWhereChangeOccurred
    }
  })

  //console.log(diffResults);
  //console.log(indexOfWhereChangeOccurred);
  //console.log(newCharacterIsPlaceholderCharacter);

  // The caret position and the change are too far apart, which means some ambiguous change
  // happened. I.e (333) ___-____ to (333) 3__-____
  // In that case, just return the currentCaretPosition
  if ((indexOfWhereChangeOccurred - currentCaretPosition) > 1) { return currentCaretPosition }

  // There are more than one change in the diffResults, which means we're dealing with
  // paste or select and delete operation. We don't need to adjust the caret position
  // for those operations.
  if (addedCount > 1 || removedCount > 1) { return currentCaretPosition }

  const placeholder = convertMaskToPlaceholder(mask)

  //console.log(placeholder);
  //console.log(placeholder[indexOfWhereChangeOccurred - 1]);

  if (
    // New character was added at the end of a mask part. Find the nearest placeholder character
    // to the right and return that the new caret position
    (newCharacterIsPlaceholderCharacter !== true) &&
    (placeholder[indexOfWhereChangeOccurred + 1] !== undefined) &&
    (placeholder[indexOfWhereChangeOccurred + 1] !== placeholderCharacter)
  ) {
    for (let i = indexOfWhereChangeOccurred + 2; i < placeholder.length; i++) {
      if (placeholder[i] === placeholderCharacter) {
        return i
      }
    }

    // New character possibly at the end of entire mask. Just keep the caret at its place.
    return currentCaretPosition
  } else if (
    // A character has actually been deleted and the previous spot in the mask
    // is not a placeholder. So, find the nearest placeholder character on the left and return that
    // as the new caret position
    (newCharacterIsPlaceholderCharacter === true) &&
    (placeholder[indexOfWhereChangeOccurred - 1] !== undefined) &&
    (placeholder[indexOfWhereChangeOccurred - 1] !== placeholderCharacter)
  ) {
    for (let i = indexOfWhereChangeOccurred - 2; i > 0; i--) {
      if (placeholder[i] === placeholderCharacter) {
        return i + 1 // It should be right after the next placeholder character
      }
    }

    return currentCaretPosition
  }

  // Not sure yet why I need this condition here. There's a logical reason for it, but I will think
  // about it later.
  return (!newCharacterIsPlaceholderCharacter) ?
    indexOfWhereChangeOccurred + 1 :
    indexOfWhereChangeOccurred
}
