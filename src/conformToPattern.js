import {constructConformedString} from './utilities.js'
import getPatternParts from './getPatternParts.js'
import getUserInputParts from './getUserInputParts.js'
import assignUserInputToPatternParts from './assignUserInputToPatternParts.js'

export default function conformToPattern(userInput, pattern) {
  const patternParts = getPatternParts(pattern)
  const userInputParts = getUserInputParts(userInput, pattern)
  const mergedParts = assignUserInputToPatternParts(patternParts, userInputParts)

  //const userInputPositionAssignments = assignUserInputToPatternPositions(
  //  userInput,
  //  pattern
  //)

  return constructConformedString(mergedParts)
}
