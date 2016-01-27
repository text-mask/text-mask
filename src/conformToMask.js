import {constructConformedString} from './utilities.js'
import getPatternParts from './getPatternParts.js'
import getUserInputParts from './getUserInputParts.js'
import assignUserInputToPatternParts from './assignUserInputToPatternParts.js'

export default function conformToMask(userInput, pattern) {
  const patternParts = getPatternParts(pattern)
  const userInputParts = getUserInputParts(userInput, pattern)
  const mergedParts = assignUserInputToPatternParts(patternParts, userInputParts)

  return constructConformedString(mergedParts)
}
