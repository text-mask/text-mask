import {convertMaskToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getChangeDetails from './getChangeDetails.js'

export default function adjustCaretPosition({
  previousInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0
}) {
  const {input = '', output = '', mask = '', options = {}} = conformToMaskResults
  const {guide = false} = options
  const placeholder = convertMaskToPlaceholder(mask)
  const isAddition = !(output.length < previousInput.length || input.length < previousInput.length)

  if (guide === false) {
    if (currentCaretPosition === input.length) {
      return output.length
    } else {
      if (placeholder[currentCaretPosition] === placeholderCharacter) {
        return currentCaretPosition
      } else {
        for (let i = currentCaretPosition; i < placeholder.length; i--) {
          if (placeholder[i] === placeholderCharacter) {
            return i
          }
        }
      }
    }
  }

  if (previousInput === output) {
    const newPosition = (isAddition) ?
    currentCaretPosition - 1 :
      currentCaretPosition

    if (placeholder[newPosition] === placeholderCharacter) {
      return newPosition
    } else {
      if (isAddition) {
        for (let i = newPosition + 1; i < placeholder.length; i++) {
          if (placeholder[i] === placeholderCharacter) {
            return i
          }
        }
      } else {
        for (let i = newPosition; i > 0; i--) {
          if (placeholder[i] === placeholderCharacter) {
            return i + 1
          }
        }
      }
    }
  } else {
    const changeDetails = getChangeDetails(previousInput || placeholder, output)
    const indexOfChange = changeDetails[(isAddition) ? 'indexOfLastChange' : 'indexOfFirstChange']

    if ((indexOfChange - currentCaretPosition) > 1) {
      return currentCaretPosition
    }

    if (isAddition) {
      for (let i = indexOfChange + 1; i < placeholder.length; i++) {
        if (placeholder[i] === placeholderCharacter) {
          return i
        }
      }
    } else {
      if (placeholder[currentCaretPosition - 1] === placeholderCharacter) {
        return currentCaretPosition
      }

      for (let i = indexOfChange - 1; i > 0; i--) {
        if (placeholder[i] === placeholderCharacter) {
          return i + 1 // it should be immediately after the next placeholder character
        }
      }
    }
  }

  return (isAddition) ? output.length : 0
}
