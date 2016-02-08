import {convertPatternToPlaceholder, getDelimiters} from './utilities.js'
import {placeholderCharacter, maskingCharacters} from './constants.js'
import assignUserInputToPatternPositions from './assignUserInputToPatternPositions.js'
import insertCharactersIntoPattern from './insertCharactersIntoPattern.js'

export default function conformToPattern(userInput, pattern) {
  const characterPositions = assignUserInputToPatternPositions(userInput, pattern)

  return insertCharactersIntoPattern(characterPositions, pattern)
}
