import {
  convertMaskToPlaceholder,
  tokenize,
  isAcceptableCharacter as isAcceptableChar,
  potentiallyTransformCharacter as potentiallyTransformChar,
  getIndexOfFirstChange,
  unescapeMask
} from './utilities.js'
import {placeholderCharacter as defaultPlaceholderChar} from './constants.js'

export default function conformToMask(userInput = '', mask = '', config = {}) {
  // These configurations tell us how to conform the mask
  const {
    guide = true,
    previousConformedInput = '',
    placeholderChar = defaultPlaceholderChar,
    validator: isCustomValid = alwaysReturnTrue
  } = config

  // We will be iterating over each character in the placeholder and sort of fill it up
  // with user input
  const placeholder = convertMaskToPlaceholder({mask, placeholderChar})

  // The configs below indicate that the user wants the algorithm to work in *no guide* mode
  const suppressGuide = guide === false && previousConformedInput !== undefined

  // Tells us the index of the first change. For (438) 394-4938 to (38) 394-4938, that would be 1
  const indexOfFirstChange = getIndexOfFirstChange(previousConformedInput, userInput)

  // This tells us the number of edited characters and the direction in which they were edited (+/-)
  const numberOfEditedChars = userInput.length - previousConformedInput.length

  const userInputArr = tokenize(userInput)

  // In *no guide* mode, we need to know if the user is trying to add a character or not
  const isAddition = suppressGuide && !(userInput.length < previousConformedInput.length)

  // Unescaping a mask turns a mask like `+\1 (111) 111-1111` into `+  (111) 111-1111`. That is,
  // it substituted an escaped character with empty white space. We do that because further down
  // in the algorithm when we insert user input characters into the placeholder, we don't want the
  // code to think that we can insert a numeric character in the `1` spot (which when unescaped
  // stands for *any numeric character*).
  const unescapedMask = unescapeMask(mask)

  // The loop below removes masking characters from user input. For example, for mask
  // `00 (111)`, the placeholder would be `00 (___)`. If user input is `00 (234)`, the loop below
  // would remove all characters but `234` from the `userInputArr`. The rest of the algorithm
  // then would lay `234` on top of the available placeholder positions in the mask.
  let numberOfSpliceOperations = 0
  for (let i = 0; i < placeholder.length && userInputArr.length > 0; i++) {
    const shouldJumpAheadInUserInput = i >= indexOfFirstChange && previousConformedInput !== ''
    const userInputPointer = (
      (shouldJumpAheadInUserInput ? i + numberOfEditedChars : i) - numberOfSpliceOperations
    )

    if (
      placeholder[i] === userInputArr[userInputPointer] &&
      userInputArr[userInputPointer] !== placeholderChar
    ) {
      userInputArr.splice(userInputPointer, 1)

      numberOfSpliceOperations++
    }
  }

  // This is the variable that we will be filling with characters as we figure them out
  // in the algorithm below
  let conformedString = ''

  // Ok, so first we loop through the placeholder looking for placeholder characters to fill up.
  placeholderLoop: for (let i = 0; i < placeholder.length; i++) {
    const charInPlaceholder = placeholder[i]

    // We see one. Let's find out what we can put in it.
    if (charInPlaceholder === placeholderChar) {
      // But before that, do we actually have any user characters that need a place?
      if (userInputArr.length > 0) {
        // We will keep chipping away at user input until either we run out of characters
        // or we find at least one character that we can map.
        while (userInputArr.length > 0) {
          // Let's retrieve the first user character in the queue of characters we have left
          const userInputChar = userInputArr.shift()

          // If the character we got from the user input is a placeholder character (which happens
          // regularly because user input could be something like (540) 90_-____, which includes
          // a bunch of `_` which are placeholder characters) and we are not in *no guide* mode,
          // then we map this placeholder character to the current spot in the placeholder
          if (userInputChar === placeholderChar && suppressGuide !== true) {
            conformedString += placeholderChar

            // And we go to find the next placeholder character that needs filling
            continue placeholderLoop

          // Else if, the character we got from the user input is not a placeholder, let's see
          // if the current position in the mask can accept it.
          } else if (isAcceptableChar(userInputChar, unescapedMask[i])) {
            // if it is accepted. We map it--performing any necessary transforming along the way,
            // like upper casing or lower casing.
            conformedString += potentiallyTransformChar(userInputChar, unescapedMask[i])

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
      conformedString += charInPlaceholder
    }
  }

  // The following logic is needed to deal with the case of deletion in *no guide* mode.
  //
  // Consider the silly mask `(111) /// 1`. What if user tries to delete the last placeholder
  // position? Something like `(589) /// `. We want to conform that to `(589`. Not `(589) /// `.
  // That's why the logic below finds the last filled placeholder character, and removes everything
  // from that point on.
  if (suppressGuide && isAddition === false) {
    let indexOfLastFilledPlaceholderChar = null

    // Find the last filled placeholder position and substring from there
    for (let i = 0; i < conformedString.length; i++) {
      if (placeholder[i] === placeholderChar) {
        indexOfLastFilledPlaceholderChar = i
      }
    }

    if (indexOfLastFilledPlaceholderChar !== null) {
      // We substring from the beginning until the position after the last filled placeholder char.
      conformedString = conformedString.substr(0, indexOfLastFilledPlaceholderChar + 1)
    } else {
      // If we couldn't find `indexOfLastFilledPlaceholderCharacter` that means the user deleted
      // the first character in the mask. So we return an empty string.
      conformedString = ''
    }
  }

  return {
    output: isCustomValid(conformedString) ? conformedString : previousConformedInput,
    meta: {
      input: userInput,
      mask: mask,
      guide,
      placeholderChar,
      placeholder
    }
  }
}

function alwaysReturnTrue() {
  return true
}
