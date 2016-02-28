import {
  convertMaskToPlaceholder,
  tokenize,
  getDelimiters,
  isAcceptableCharacter
} from './utilities.js'
import {placeholderCharacter, maskingCharacters} from './constants.js'

export default function conformToMask(userInput = '', mask = '') {
  const placeholder = convertMaskToPlaceholder(mask)
  const pendingUserInputTokens = tokenize(userInput)
  const maskDelimiters = getDelimiters(mask)

  return {
    input: userInput,
    mask: mask,

    // Go through the placeholder to determine what to place in it
    output: tokenize(placeholder).map((characterInPlaceholder, index) => {

      // if current character is a placeholder character, that means we could potentially
      // place user input in it. So, if we still have pending user tokens, let's do it!
      if (
        characterInPlaceholder === placeholderCharacter &&
        pendingUserInputTokens.length > 0
      ) {

        // Let's loop through the remaining user input characters to find out what
        // should go in the current placeholder position
        for (let i = 0; i <= pendingUserInputTokens.length; i++) {

          // Pull user character to potentially map it to the current
          // placeholder position.
          const userInputCharacter = pendingUserInputTokens.shift()

          if (

            // is the character in the user input a placeholder character?
            userInputCharacter === placeholderCharacter ||

            // or, are we sure the character is not part of the mask
            // delimiters and that it is an acceptable character?
            (
              maskDelimiters.indexOf(userInputCharacter) === -1 &&
              isAcceptableCharacter(userInputCharacter, mask[index]) === true
            )
          ) {

            // if so, map it!
            return userInputCharacter
          }
        }
      }

      // if the current character is not placeholder or we don't have any more user input
      // characters to assign, then just return the same current character
      return characterInPlaceholder
    }).join('')
  }
}
