import {placeholderCharacter} from './constants.js'
import {convertMaskToPlaceholder} from './utilities.js'

export default function getMaskAreaLengths(mask = '') {
  const placeholder = convertMaskToPlaceholder(mask)
  const maskAreaLengths = []

  let lengthOfArea = 0
  placeholder.split('').forEach((character) => {
    if (character === placeholderCharacter) {
      lengthOfArea++
    } else if (lengthOfArea > 0) {
      maskAreaLengths.push(lengthOfArea)

      lengthOfArea = 0
    }
  })

  if (lengthOfArea > 0) {
    maskAreaLengths.push(lengthOfArea)
  }

  return maskAreaLengths
}
