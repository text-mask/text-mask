import diff from 'diff'
import {convertPatternToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function adjustCursorPosition(
  previousUserInput = '',
  newUserInput = '',
  currentCursorPosition = 0,
  pattern = ''
) {
  if (previousUserInput === newUserInput) { return currentCursorPosition }

  const diffResults = diff.diffChars(previousUserInput, newUserInput)

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

  console.log(diffResults);
  console.log(indexOfWhereChangeOccurred);
  console.log(newCharacterIsPlaceholderCharacter);

  // Some ambiguous changes happened. The cursor position and the change are too far
  // apart. Just return the currentCursorPosition
  if ((indexOfWhereChangeOccurred - currentCursorPosition) > 1) { return currentCursorPosition }

  // There are more than one change in the diffResults. We don't support adjusting the cursor
  // position for those kinds of changes yet.
  if (addedCount > 1 || removedCount > 1) { return currentCursorPosition }

  // Identify in which editable pattern part the change occurred
  const placeholder = convertPatternToPlaceholder(pattern)

  console.log(placeholder);
  console.log(placeholder[indexOfWhereChangeOccurred - 1]);

  if (
    (newCharacterIsPlaceholderCharacter !== true) &&
    (placeholder[indexOfWhereChangeOccurred + 1] !== undefined) &&
    (placeholder[indexOfWhereChangeOccurred + 1] !== placeholderCharacter)
  ) {
    // New character was added at the end of a pattern part. Find the nearest placeholder character
    // to the right and return that the new cursor position
    for (let i = indexOfWhereChangeOccurred + 2; i < placeholder.length; i++) {
      if (placeholder[i] === placeholderCharacter) {
        return i
      }
    }

    // New character possibly at the end of entire pattern. Just keep the cursor at its place.
    return currentCursorPosition
  } else if (
    (newCharacterIsPlaceholderCharacter === true) &&
    (placeholder[indexOfWhereChangeOccurred - 1] !== undefined) &&
    (placeholder[indexOfWhereChangeOccurred - 1] !== placeholderCharacter)
  ) {
    // When we are here, a character has actually been deleted and the previous spot in the pattern
    // is not a placeholder. So, find the nearest placeholder character on the left and return that
    // as the new cursor position
    for (let i = indexOfWhereChangeOccurred - 2; i > 0; i--) {
      if (placeholder[i] === placeholderCharacter) {
        return i + 1 // It should be right after the next placeholder character
      }
    }

    return currentCursorPosition
  }

  // Not sure yet why I need this condition here. There's a logical reason for it, but will think
  // about it later.
  return (!newCharacterIsPlaceholderCharacter) ?
    indexOfWhereChangeOccurred + 1 :
    indexOfWhereChangeOccurred
}
