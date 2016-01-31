import {
  convertPatternToPlaceholder,
  getDelimiters,
  findCharacter
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function insertCharacterIntoPattern(characterPositions = [], pattern = '') {
  const placeholder = convertPatternToPlaceholder(pattern)

  let currentArea = 0
  let currentPosition = 0
  let canAdvanceToNextArea = false

  return placeholder.split('').map((patternCharacter) => {
    if (patternCharacter === placeholderCharacter) {
      const userInputCharacter = findCharacter(characterPositions, {
        area: currentArea,
        position: currentPosition
      })

      currentPosition++
      canAdvanceToNextArea = true

      return userInputCharacter || patternCharacter
    } else if (canAdvanceToNextArea) {
      currentArea++
      currentPosition = 0
      canAdvanceToNextArea = false
    }

    return patternCharacter
  }).join('')
}
