import {
  convertMaskToPlaceholder,
  getDelimiters,
  findCharacter
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function insertCharactersIntoMask(characterPositions = [], mask = '') {
  const placeholder = convertMaskToPlaceholder(mask)

  let currentArea = 0
  let currentPosition = 0
  let canAdvanceToNextArea = false

  return placeholder.split('').map((maskCharacter) => {
    if (maskCharacter === placeholderCharacter) {
      const userInputCharacter = findCharacter(characterPositions, {
        area: currentArea,
        position: currentPosition
      })

      currentPosition++
      canAdvanceToNextArea = true

      return userInputCharacter || maskCharacter
    } else if (canAdvanceToNextArea) {
      currentArea++
      currentPosition = 0
      canAdvanceToNextArea = false
    }

    return maskCharacter
  }).join('')
}
