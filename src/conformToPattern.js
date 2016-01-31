import {convertPatternToPlaceholder, getDelimiters} from './utilities.js'
import {placeholderCharacter, maskingCharacters} from './constants.js'
import assignUserInputToPatternPositions from './assignUserInputToPatternPositions.js'
import insertCharacterIntoPattern from './insertCharacterIntoPattern.js'

export default function conformToPattern(userInput, pattern) {
  const characterPositions = assignUserInputToPatternPositions(userInput, pattern)
  const placeholder = convertPatternToPlaceholder(pattern)

  return characterPositions.reduce((accumulator, characterPosition) => {
    const characterIndexInPattern = getCharacterIndexInPattern(characterPosition, pattern)

    return placeholder.substr(0, index) + character + this.substr(index + character.length);
  }, '')
}
