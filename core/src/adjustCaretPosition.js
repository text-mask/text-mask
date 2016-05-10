import {convertMaskToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getChangeDetails from './getChangeDetails.js'

export default function adjustCaretPosition({
  previousInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0
}) {
  const {
    input: unconformedInput = '',
    output: conformedInput = '',
    mask = '',
    config = {}
  } = conformToMaskResults
  const {guide = true} = config
  const placeholder = convertMaskToPlaceholder(mask)
  const isAddition = !(
    conformedInput.length < previousInput.length ||
    unconformedInput.length < previousInput.length
  )
  const {numberOfChanges} = getChangeDetails(previousInput, conformedInput)

  // if (guide === false) {
  //   if (currentCaretPosition === input.length) {
  //     return output.length
  //   } else {
  //     if (placeholder[currentCaretPosition] === placeholderCharacter) {
  //       return currentCaretPosition
  //     } else {
  //       for (let i = currentCaretPosition; i < placeholder.length; i--) {
  //         if (placeholder[i] === placeholderCharacter) {
  //           return i
  //         }
  //       }
  //     }
  //   }
  // }

  const newPosition = (isAddition) ?
    currentCaretPosition - (previousInput === conformedInput) ? 1 : 0 :
    currentCaretPosition
  const base = (numberOfChanges > 1) ? conformedInput : placeholder
  // const base = conformedInput

  console.log('numberOfChanges', numberOfChanges)

  // if (placeholder[newPosition] === placeholderCharacter) {
  //   return newPosition
  // }

  if (isAddition) {
    for (let i = newPosition; i < base.length; i++) {
      if (base[i] === placeholderCharacter) {
        return i
      }
    }
  } else {
    for (let i = newPosition; i > 0; i--) {
      if (base[i] === placeholderCharacter) {
        return i
      }
    }
  }


  // if (placeholder[newPosition] === placeholderCharacter) {
  //   return newPosition
  // } else {
  //   if (isAddition) {
  //     for (let i = newPosition + 1; i < placeholder.length; i++) {
  //       if (placeholder[i] === placeholderCharacter) {
  //         return i + 1
  //       }
  //     }
  //   } else {
  //     for (let i = newPosition; i > 0; i--) {
  //       if (placeholder[i] === placeholderCharacter) {
  //         return i + 1
  //       }
  //     }
  //   }
  // }

  // return newPosition

  // if (previousInput === currentInput) {
  //   const newPosition = (isAddition) ?
  //     currentCaretPosition - 1 :
  //     currentCaretPosition
  //
  //   if (placeholder[newPosition] === placeholderCharacter) {
  //     return newPosition
  //   } else {
  //     if (isAddition) {
  //       for (let i = newPosition + 1; i < placeholder.length; i++) {
  //         if (placeholder[i] === placeholderCharacter) {
  //           return i
  //         }
  //       }
  //     } else {
  //       for (let i = newPosition; i > 0; i--) {
  //         if (placeholder[i] === placeholderCharacter) {
  //           return i + 1
  //         }
  //       }
  //     }
  //   }
  // } else {
  //   const changeDetails = getChangeDetails(previousInput || placeholder, currentInput)
  //   const indexOfChange = changeDetails[(isAddition) ? 'indexOfLastChange' : 'indexOfFirstChange']
  //
  //   if ((indexOfChange - currentCaretPosition) > 1) {
  //     if (guide === false) {
  //       return currentInput.length
  //     } else {
  //       if (currentCaretPosition !== placeholderCharacter) {
  //         for (let i = currentCaretPosition; placeholder.length; i++) {
  //           if (placeholder[i] === placeholderCharacter) {
  //             return i
  //           }
  //         }
  //       } else {
  //         return currentCaretPosition
  //       }
  //     }
  //   }
  //
  //   if (isAddition) {
  //     for (let i = indexOfChange + 1; i < placeholder.length; i++) {
  //       if (placeholder[i] === placeholderCharacter) {
  //         return i
  //       }
  //     }
  //   } else {
  //     if (placeholder[currentCaretPosition - 1] === placeholderCharacter) {
  //       return currentCaretPosition
  //     }
  //
  //     for (let i = indexOfChange - 1; i > 0; i--) {
  //       if (placeholder[i] === placeholderCharacter) {
  //         return i + 1 // it should be immediately after the next placeholder character
  //       }
  //     }
  //   }
  // }

  return (isAddition) ? conformedInput.length : 0
}



//
//
//
// import {convertMaskToPlaceholder} from './utilities.js'
// import {placeholderCharacter} from './constants.js'
// import getChangeDetails from './getChangeDetails.js'
//
// export default function adjustCaretPosition({
//   previousInput = '',
//   conformToMaskResults = {},
//   currentCaretPosition = 0
// }) {
//   // ensure sane argument values
//   conformToMaskResults.input = conformToMaskResults.input || ''
//   conformToMaskResults.output = conformToMaskResults.output || ''
//   conformToMaskResults.mask = conformToMaskResults.mask || ''
//
//   const placeholder = convertMaskToPlaceholder(conformToMaskResults.mask)
//
//   // First determine if the operation is deletion or addition to know whether we will be
//   // seeking to move the caret forward or back.
//   const isDeletion = (
//     // if the conformed string or the input to be conformed is smaller than
//     // previous input, then the operation is deletion.
//     (conformToMaskResults.output.length < previousInput.length) ||
//     (conformToMaskResults.input.length < previousInput.length)
//   )
//
//   // is addition...
//   if (isDeletion === false) {
//     if (
//       // if previous input and conformToMaskResults.output are exactly the same, it means
//     // adjustCaretPosition was called after conformToMask rejected a character
//     previousInput === conformToMaskResults.output ||
//
//     conformToMaskResults.output === placeholder
//     ) {
//       // in that case, revert movement of the caret
//       // return currentCaretPosition - 1
//       const revertedPosition = currentCaretPosition - 1
//
//       // If the reverted position is a placeholder position, keep it there
//       if (placeholder[revertedPosition] === placeholderCharacter) {
//         return revertedPosition
//
//         // Otherwise, seek forward for the closest placeholder character
//         // This way Text Mask allows the user to enter a non-accepted character
//         // like a mask delimiter and move to the next placeholder
//       } else {
//         for (let i = revertedPosition + 1; i < placeholder.length; i++) {
//           if (placeholder[i] === placeholderCharacter) {
//             return i
//           }
//         }
//       }
//
//       // previous input is different from conformToMaskResults.output, so we need to do some work
//     } else {
//       const changeDetails = getChangeDetails(
//         previousInput || placeholder,
//         conformToMaskResults.output
//       )
//
//       // if the index of the last changed character is ahead of current caret position by more
//       // than one, then an ambiguous change happened.
//       // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was last added.
//       // In that case, just return the current caret position unmodified.
//       if ((changeDetails.indexOfLastChange - currentCaretPosition) > 1) {
//         return currentCaretPosition
//       }
//
//       // otherwise, starting at the position right after the last added character, seek the next
//       // placeholder where we can position the caret
//       for (let i = changeDetails.indexOfLastChange + 1; i < placeholder.length; i++) {
//         if (placeholder[i] === placeholderCharacter) {
//           return i
//         }
//       }
//     }
//
//     // If the previous for-loop couldn't find a placeholder in which to position the caret, that
//     // means there isn't a placeholder after the index of the last character, so just position
//     // the caret at the end of the conformed string
//     return conformToMaskResults.output.length
//
//     // is deletion...
//   } else if (isDeletion === true) {
//     // if previous input and conformed string are the same, it means adjustCaretPosition is called
//     // because the user is pressing the backspace to move the caret back
//     if (previousInput === conformToMaskResults.output) {
//       // if the caret is at a placeholder character position, it's okay to keep it where it is
//       if (placeholder[currentCaretPosition] === placeholderCharacter) {
//         return currentCaretPosition
//       }
//
//       // if the caret is anywhere that's not a placeholder character, seek back to the closest
//       // placeholder character and place the caret right after it.
//       for (let i = currentCaretPosition; i > 0; i--) {
//         if (placeholder[i] === placeholderCharacter) {
//           return i + 1 // It should be immediately after the next placeholder character
//         }
//       }
//
//       // the user has actually deleted a character, so we need to do some work
//     } else {
//       const changeDetails = getChangeDetails(
//         previousInput,
//         conformToMaskResults.output
//       )
//
//       // if the index of the last changed character is more than one position far from the current
//       // caret position, then an ambiguous change happened.
//       // I.e. (333) ___-____ => (333) 3__-____, so we don't know which character was removed.
//       // In that case, just return the current caret position unmodified.
//       if ((changeDetails.indexOfFirstChange - currentCaretPosition) > 1) {
//         return currentCaretPosition
//       }
//
//       // if the previous character in the placeholder is a placeholder character,
//       // it's okay to keep the caret at its current position
//       if (placeholder[currentCaretPosition - 1] === placeholderCharacter) {
//         return currentCaretPosition
//       }
//
//       // otherwise, starting at the index of the first removed character, seek back until we find
//       // a placeholder character at which to position the caret
//       for (let i = changeDetails.indexOfFirstChange - 1; i > 0; i--) {
//         if (placeholder[i] === placeholderCharacter) {
//           return i + 1 // it should be immediately after the next placeholder character
//         }
//       }
//     }
//
//     // if we sought back and couldn't find a placeholder character at which to position the caret
//     // we'd reach this point in the code. So, just place the caret at the beginning of the input
//     return 0
//   }
// }
