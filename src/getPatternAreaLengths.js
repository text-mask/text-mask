import {placeholderCharacter} from './constants.js'
import {convertPatternToPlaceholder} from './utilities.js'

export default function getPatternAreaLengths(pattern = '') {
  const placeholder = convertPatternToPlaceholder(pattern)
  const patternAreaLengths = []

  let lengthOfArea = 0
  placeholder.split('').forEach((character) => {
    if (character === placeholderCharacter) {
      lengthOfArea++
    } else if (lengthOfArea > 0) {
      patternAreaLengths.push(lengthOfArea)

      lengthOfArea = 0
    }
  })

  if (lengthOfArea > 0) {
    patternAreaLengths.push(lengthOfArea)
  }

  return patternAreaLengths
}
