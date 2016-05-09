import {
  convertMaskToPlaceholder,
  tokenize,
  getDelimiters,
  isAcceptableCharacter,
  potentiallyTransformCharacter,
  loop,
  contains
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function conformToMask(userInput = '', mask = '', config = {}) {
  const placeholder = convertMaskToPlaceholder(mask)
  const maskDelimiters = getDelimiters(mask)
  const {guide = false, previousUserInput} = config
  const suppressGuide = guide === false && previousUserInput !== undefined
  const userInputArr = tokenize(userInput)

  let stop = false

  const output = tokenize(placeholder).map((characterInPlaceholder, index) => {
    // We have 3 possible types of characters in user input
    // 1. Mask delimiter
    // 2. Accepted character for particular placeholder position
    // 3. Unaccepted character for particular placeholder position
    
    // We have 2 possible types of characters in placeholder
    // 1. Mask delimiter
    // 2. Placeholder character

    // If character in placeholder is a placeholder character, look for a character from user
    // input to map it to.

    if (stop) {
      return ''
    }

    if (characterInPlaceholder === placeholderCharacter) {
      // We have user characters that we need to map
      if (userInputArr.length > 0) {

        // Loop through, potentially, the entire user input to find a suitable
        // character to put in the placeholder position
        while (userInputArr.length > 0) {
          const userInputCharacter = userInputArr.shift()

          if (userInputCharacter === placeholderCharacter) {
            return placeholderCharacter
          } else if (isAcceptableCharacter(userInputCharacter, mask[index])) {
            return potentiallyTransformCharacter(userInputCharacter, mask[index])
          }
        }

        return characterInPlaceholder
      // We are done with user characters. Now let's see
      } else {
        return characterInPlaceholder
      }
    } else {
      return characterInPlaceholder
    }


    // What we do with the user input types depend on the type of the current
    // placeholder character that we're looking at. So, let's examine that first
    // if (characterInPlaceholder === placeholderCharacter) {
    //   // The way we decide what to do here depends on whether we're in guided or unguided mode
    //   if (suppressGuide) {
    //     // If we don't have any more user input characters, we should return '' to suppress
    //     // the guide. Otherwise, we should map the character to the placeholder
    //
    //
    //     if (userInputArr.length === 0) {
    //       return ''
    //     } else {
    //       return userInputArr.shift()
    //     }
    //   } else {
    //     // What we do here depends on the following factors
    //     // 1. Are we at the end of the user input?
    //     // 2. Are we in guided mode or not?
    //     // 3. Is the user adding characters or deleting characters?
    //     // If placeholder character is a mask delimiter, and we still have user input characters
    //   }
    // } else if (contains(maskDelimiters, characterInPlaceholder)) {
    //   if (userInputArr.length === 1) {
    //     return userInputArr.shift()
    //   } else {
    //     return ''
    //   }
    // }

    // if current character is a placeholder character, that means we could potentially
    // place user input in it. So, if we still have pending user tokens, let's do it!
    // if (
    //   characterInPlaceholder === placeholderCharacter &&
    //   numberOfPendingUserInputCharacters > 0
    // ) {
    //   // Let's loop through the remaining user input characters to find out what
    //   // should go in the current placeholder position
    //   for (
    //     let i = userInput.length - numberOfPendingUserInputCharacters;
    //     i < userInput.length;
    //     i++
    //   ) {
    //     // Pull user character to potentially map it to the current
    //     // placeholder position.
    //     const userInputCharacter = userInput[i]
    //
    //     numberOfPendingUserInputCharacters--
    //
    //     if (
    //       // is the character in the user input a placeholder character?
    //     userInputCharacter === placeholderCharacter ||
    //
    //     // or, are we sure the character is not part of the mask
    //     // delimiters and that it is an acceptable character?
    //     (
    //       maskDelimiters.indexOf(userInputCharacter) === -1 &&
    //       isAcceptableCharacter(userInputCharacter, mask[index]) === true
    //     )
    //     ) {
    //       // if so, map it to a potentially transformed character!
    //       return potentiallyTransformCharacter(userInputCharacter, mask[index])
    //     }
    //   }
    // } else {
    //   // if the current character is not placeholder or we don't have any more user input
    //   // characters to assign, then just return the same current character
    //   if (suppressGuide) {
    //     return ''
    //   }
    //
    //   return characterInPlaceholder
    // }
  }).join('')

  return {
    input: userInput,
    mask: mask,

    // Go through the placeholder to determine what to place in it
    output,

    config: {guide},
  }
}
