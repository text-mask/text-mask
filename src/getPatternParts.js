import {placeholderCharacter} from './constants.js'
import {convertPatternToPlaceholder} from './utilities.js'

export default function getPatternParts(pattern = '') {
  const placeholder = convertPatternToPlaceholder(pattern)
  const patternParts = []

  let lengthOfPart = 0
  placeholder.split('').forEach((character) => {
    if (character === placeholderCharacter) {
      lengthOfPart++
    } else {
      patternParts.push({
        length: lengthOfPart,
        delimiter: character,
        content: ''
      })

      lengthOfPart = 0
    }
  })

  if (lengthOfPart > 0) {
    patternParts.push({
      length: lengthOfPart,
      delimiter: '',
      content: ''
    })
  }

  return patternParts
}
