import {
  convertPatternToPlaceholder,
  removeCharactersStartingAtIndex,
  constructConformedString
} from './utilities.js'
import analyzeValue from './analyzeValue.js'
import getPatternEditableAreas from './getPatternEditableAreas.js'
import chunkUserInput from './chunkUserInput.js'
import assignUserInputToPatternEditableAreas from './assignUserInputToPatternEditableAreas.js'
import isUnexpectedUserInput from './isUnexpectedUserInput.js'

export default function conformToMask(userInput, pattern) {
  if (isUnexpectedUserInput(userInput)) {
    return {
      value: convertPatternToPlaceholder(pattern),
      cursorPosition: undefined
    }
  }

  const patternEditableAreas = getPatternEditableAreas(pattern)
  const userInputChunks = chunkUserInput(userInput, pattern)

  console.log(patternEditableAreas, userInputChunks);

  const editableAreasWithContent = assignUserInputToPatternEditableAreas(
    patternEditableAreas,
    userInputChunks
  )

  return {
    value: constructConformedString(editableAreasWithContent),
    cursorPosition: undefined
  }
}
