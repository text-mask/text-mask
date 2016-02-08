import {convertMaskToPlaceholder, getDelimiters} from './utilities.js'
import {placeholderCharacter, maskingCharacters} from './constants.js'
import assignUserInputToMaskPositions from './assignUserInputToMaskPositions.js'
import insertCharactersIntoMask from './insertCharactersIntoMask.js'

export default function conformToMask(userInput, mask) {
  const characterPositions = assignUserInputToMaskPositions(userInput, mask)

  return insertCharactersIntoMask(characterPositions, mask)
}
