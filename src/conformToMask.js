import {
  convertPatternToPlaceholder,
  removeCharactersStartingAtIndex,
  constructConformedString
} from './utilities.js'
import analyzeValue from './analyzeValue.js'
import getPatternParts from './getPatternParts.js'
import chunkUserInput from './getUserInputParts.js'
import assignUserInputToPatternParts from './assignUserInputToPatternParts.js'
import isUnexpectedUserInput from './isUnexpectedUserInput.js'

export default function conformToMask(userInput, pattern) {
  if (isUnexpectedUserInput(userInput)) {
    return {
      value: convertPatternToPlaceholder(pattern),
      cursorPosition: undefined
    }
  }

  const patternEditableAreas = getPatternParts(pattern)
  const userInputChunks = chunkUserInput(userInput, pattern)

  console.log(patternEditableAreas, userInputChunks);

  const editableAreasWithContent = assignUserInputToPatternParts(
    patternEditableAreas,
    userInputChunks
  )

  return {
    value: constructConformedString(editableAreasWithContent),
    cursorPosition: undefined
  }
}
