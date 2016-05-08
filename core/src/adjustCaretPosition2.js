import {convertMaskToPlaceholder} from './utilities.js'
import {placeholderCharacter} from './constants.js'
import getChangeDetails from './getChangeDetails.js'

export default function adjustCaretPosition({
  previousInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0
}) {
  // ensure sane argument values
  const {input = '', output = '', mask = '', options = {}} = conformToMaskResults
  const {guided = false} = options
  const placeholder = convertMaskToPlaceholder(conformToMaskResults.mask)

  const isDeletion = (
    (conformToMaskResults.output.length < previousInput.length) ||
    (conformToMaskResults.input.length < previousInput.length)
  )

  if (previousInput === output) {
    const newPosition = (isDeletion === false) ?
      currentCaretPosition - 1 :
      currentCaretPosition

    if (placeholder[newPosition] === placeholderCharacter) {
      return newPosition
    } else {
      // i < placeholder.length
      // i > 0

      for (
        let i = newPosition;
        i > 0;
        i--
      ) {
        return (isDeletion === false) ? i : i + 1
      }
    }
  }


}
