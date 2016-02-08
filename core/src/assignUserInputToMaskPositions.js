import {getDelimiters} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getMaskAreaLengths from './getMaskAreaLengths.js'

export default function assignUserInputToMaskPositions(userInput = '', mask = '') {
  const maskDelimiters = getDelimiters(mask)
  const assignedCharacters = []
  const maskAreaLengths = getMaskAreaLengths(mask)
  const remainingMaskAreaLengths = maskAreaLengths.slice()

  let areaPositionIndex = 0
  let currentMaskAreaIndex = 0

  userInput.split('').forEach((character) => {
    if (
      // character is NOT mask delimiter
      maskDelimiters.indexOf(character) === -1 &&
      // character is NOT a placeholder character
      character !== placeholderCharacter &&
      // There are still empty placeholder spots in the current mask area
      remainingMaskAreaLengths[currentMaskAreaIndex] > 0 &&
      // We are NOT outside the boundaries of the mask
      (
        // This is NOT the last area of the mask
        currentMaskAreaIndex !== maskAreaLengths.length - 1 ||
        (
          // This IS the last area of the mask
          currentMaskAreaIndex === maskAreaLengths.length - 1 &&
          // The area position index is still within the boundaries of the last area
          areaPositionIndex <= maskAreaLengths[currentMaskAreaIndex]
        )
      )
    ) {
      assignedCharacters.push({
        character: character,
        position: areaPositionIndex,
        area: currentMaskAreaIndex
      })

      areaPositionIndex++
      remainingMaskAreaLengths[currentMaskAreaIndex]--
    } else if (character === placeholderCharacter) {
      areaPositionIndex++
      remainingMaskAreaLengths[currentMaskAreaIndex]--
    }

    // Should we advance to the next mask area?
    if (
      (
        maskDelimiters.indexOf(character) !== -1 &&
        remainingMaskAreaLengths[currentMaskAreaIndex] <= 0
      ) ||
      (
        areaPositionIndex + 1 > maskAreaLengths[currentMaskAreaIndex]
      )
    ) {
      let remainingCharactersInMaskArea =
        areaPositionIndex -
        maskAreaLengths[currentMaskAreaIndex]

      areaPositionIndex = 0
      currentMaskAreaIndex++

      while (remainingCharactersInMaskArea > 0) {
        areaPositionIndex++
        remainingCharactersInMaskArea--
      }
    }
  })

  return assignedCharacters
}
