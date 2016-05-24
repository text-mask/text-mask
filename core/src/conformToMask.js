import {
  convertMaskToPlaceholder,
  tokenize,
  isAcceptableCharacter,
  potentiallyTransformCharacter,
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function conformToMask(userInput = '', mask = '', config = {}) {
  // These configurations tell us how to conform the mask
  const {guide = true, previousConformedInput} = config

  // We will be iterating over each character in the placeholder and sort of fill it up
  // with user input
  const placeholder = convertMaskToPlaceholder(mask)

  // The configs below indicate that the user wants the algorithm to work in *no guide* mode
  const suppressGuide = guide === false && previousConformedInput !== undefined

  // This is the user input that we will take characters from and map them to the placeholder
  const userInputArr = tokenize(userInput)

  // In *no guide* mode, we need to know if the user is trying to add a character or not
  const isAddition = suppressGuide && !(userInput.length < previousConformedInput.length)

  // This is the variable that we will be filling with characters as we figure them out
  // in the algorithm below
  let conformedString = ''

  // Ok, so first we loop through the placeholder looking for placeholder characters to fill up.
  placeholderLoop: for (let i = 0; i < placeholder.length; i++) {
    const characterInPlaceholder = placeholder[i]

    // We see one. Let's find out what we can put in it.
    if (characterInPlaceholder === placeholderCharacter) {
      // But before that, do we actually have any user characters that need a place?
      if (userInputArr.length > 0) {
        // We will keep chipping away at user input until either we run out of characters
        // or we find at least one character that we can map.
        while (userInputArr.length > 0) {
          // Let's retrieve the first user character in the queue of characters we have left
          const userInputCharacter = userInputArr.shift()

          // If the character we got from the user input is a placeholder character (which happens
          // regularly because user input could be something like (540) 90_-____, which includes
          // a bunch of `_` which are placeholder characters) and we are not in *no guide* mode,
          // then we map this placeholder character to the current spot in the placeholder
          if (userInputCharacter === placeholderCharacter && suppressGuide !== true) {
            conformedString += placeholderCharacter

            // And we go to find the next placeholder character that needs filling
            continue placeholderLoop

          // Else if, the character we got from the user input is not a placeholder, let's see
          // if the current position in the mask can accept it.
          } else if (isAcceptableCharacter(userInputCharacter, mask[i])) {
            // if it is accepted. We map it--performing any necessary transforming along the way,
            // like upper casing or lower casing.
            conformedString += potentiallyTransformCharacter(userInputCharacter, mask[i])

            // Since we've mapped this placeholder position. We move on to the next one.
            continue placeholderLoop
          }
        }
      }

      // We reach this point when we've mapped all the user input characters to placeholder
      // positions in the mask. In *guide* mode, we append the left over characters in the
      // placeholder to the `conformedString`, but in *no guide* mode, we don't wanna do that.
      //
      // That is, for mask `(111)` and user input `2`, we want to return `(2`, not `(2__)`.
      if (suppressGuide === false) {
        conformedString += placeholder.substr(i, placeholder.length)
      }

      // And we break
      break

    // Else, the characterInPlaceholder is not a placeholderCharacter. That is, we cannot fill it
    // with user input. So we just map it to the final output
    } else {
      // If characterInPlaceholder is the same as what is in the user input. We need to remove
      // the character from the user input. The main reason is to avoid a situation where the
      // placeholder is something like `00 (___) ___-____`. In this situation, if we don't
      // remove the `0` characters as we do below, they will be mapped to placeholder characters
      // by the loop above. So we'll have zeros in the placeholder AND in the conformed string.
      // I.e. `00 (00_) ___-____`
      if (characterInPlaceholder === userInput[i]) {
        userInputArr.shift()
      }

      conformedString += characterInPlaceholder
    }
  }

  // The following logic is needed to deal with the case of deletion in *no guide* mode.
  //
  // Consider the silly mask `(111) /// 1`. What if user tries to delete the last placeholder
  // position? Something like `(589) /// `. We want to conform that to `(589`. Not `(589) /// `.
  // That's why the logic below finds the last filled placeholder character, and removes everything
  // from that point on.
  if (suppressGuide && isAddition === false) {
    let indexOfLastFilledPlaceholderCharacter = null

    // Find the last filled placeholder position and substring from there
    for (let i = 0; i < conformedString.length; i++) {
      if (placeholder[i] === placeholderCharacter) {
        indexOfLastFilledPlaceholderCharacter = i
      }
    }

    if (indexOfLastFilledPlaceholderCharacter !== null) {
      // We substring from the beginning until the position after the last filled placeholder char.
      conformedString = conformedString.substr(0, indexOfLastFilledPlaceholderCharacter + 1)
    } else {
      // If we couldn't find `indexOfLastFilledPlaceholderCharacter` that means the user deleted
      // the first character in the mask. So we return an empty string.
      conformedString = ''
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
