import {getDelimiters} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getPatternAreaLengths from './getPatternAreaLengths.js'

export default function assignUserInputToPatternPositions(userInput = '', pattern = '') {
  const patternDelimiters = getDelimiters(pattern)
  const assignedCharacters = []
  const patternAreaLengths = getPatternAreaLengths(pattern)
  const remainingPatternAreaLengths = patternAreaLengths.slice()

  let areaPositionIndex = 0
  let currentPatternAreaIndex = 0

  userInput.split('').forEach((character) => {
    if (
      // character is NOT pattern delimiter
      patternDelimiters.indexOf(character) === -1 &&
      // character is NOT a placeholder character
      character !== placeholderCharacter &&
      // There are still empty placeholder spots in the current pattern area
      remainingPatternAreaLengths[currentPatternAreaIndex] > 0 &&
      // We are NOT outside the boundaries of the pattern
      (
        // This is NOT the last area of the pattern
        currentPatternAreaIndex !== patternAreaLengths.length - 1 ||
        (
          // This IS the last area of the pattern
          currentPatternAreaIndex === patternAreaLengths.length - 1 &&
          // The area position index is still within the boundaries of the last area
          areaPositionIndex <= patternAreaLengths[currentPatternAreaIndex]
        )
      )
    ) {
      assignedCharacters.push({
        character: character,
        position: areaPositionIndex,
        area: currentPatternAreaIndex
      })

      areaPositionIndex++
      remainingPatternAreaLengths[currentPatternAreaIndex]--
    } else if (character === placeholderCharacter) {
      areaPositionIndex++
      remainingPatternAreaLengths[currentPatternAreaIndex]--
    }

    // Should we advance to the next pattern area?
    if (
      (
        patternDelimiters.indexOf(character) !== -1 &&
        remainingPatternAreaLengths[currentPatternAreaIndex] <= 0
      ) ||
      (
        areaPositionIndex + 1 > patternAreaLengths[currentPatternAreaIndex]
      )
    ) {
      let remainingCharactersInPatternArea =
        areaPositionIndex -
        patternAreaLengths[currentPatternAreaIndex]

      areaPositionIndex = 0
      currentPatternAreaIndex++

      while (remainingCharactersInPatternArea > 0) {
        areaPositionIndex++
        remainingCharactersInPatternArea--
      }
    }
  })

  return assignedCharacters
}
