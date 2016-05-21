import {
  convertMaskToPlaceholder,
  tokenize,
  isAcceptableCharacter,
  potentiallyTransformCharacter,
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function conformToMask(userInput = '', mask = '', config = {}) {
  const placeholder = convertMaskToPlaceholder(mask)
  const {guide = true, previousConformedInput} = config
  const suppressGuide = guide === false && previousConformedInput !== undefined
  const userInputArr = tokenize(userInput)
  const isAddition = suppressGuide && !(userInput.length < previousConformedInput.length)

  let conformedString = ''

  // We have 3 possible types of characters in user input
  // 1. Mask delimiter
  // 2. Accepted character for particular placeholder position
  // 3. Unaccepted character for particular placeholder position

  // We have 2 possible types of characters in placeholder
  // 1. Mask delimiter
  // 2. Placeholder character

  // If character in placeholder is a placeholder character, look for a character from user
  // input to map it to.
  if (userInput !== '') {
    placeholderLoop: for (let i = 0; i < placeholder.length; i++) {
      const characterInPlaceholder = placeholder[i]

      if (characterInPlaceholder === placeholderCharacter) {
        // We have user characters that we need to map
        if (userInputArr.length > 0) {
          // Loop through, potentially, the entire user input to find a suitable
          // character to put in the placeholder position
          while (userInputArr.length > 0) {
            const userInputCharacter = userInputArr.shift()

            if (userInputCharacter === placeholderCharacter && suppressGuide !== true) {
              conformedString += placeholderCharacter
              continue placeholderLoop
            } else if (isAcceptableCharacter(userInputCharacter, mask[i])) {
              conformedString += potentiallyTransformCharacter(userInputCharacter, mask[i])
              continue placeholderLoop
            }
          }
        }

        if (suppressGuide) {
          break
        }

        conformedString += characterInPlaceholder
      } else {
        conformedString += characterInPlaceholder
      }
    }

    if (suppressGuide && isAddition === false) {
      let indexOfLastFilledPlaceholderCharacter = null

      // Find the last filled placeholder position and substring from there
      for (let i = 0; i < conformedString.length; i++) {
        if (
          placeholder[i] === placeholderCharacter &&
          conformedString[i] !== placeholderCharacter
        ) {
          indexOfLastFilledPlaceholderCharacter = i
        }
      }

      if (indexOfLastFilledPlaceholderCharacter !== null) {
        conformedString = conformedString.substr(0, indexOfLastFilledPlaceholderCharacter + 1)
      } else {
        conformedString = ''
      }
    }
  }

  return {
    output: conformedString,
    meta: {
      input: userInput,
      mask: mask,
      guide
    }
  }
}
