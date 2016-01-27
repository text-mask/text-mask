import {
  printPadding,
  removeCharactersStartingAtIndex
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function processPart(userInput = '', acceptedLength = 0) {
  const head = userInput.substr(0, acceptedLength)
  const tail = userInput.substr(acceptedLength, userInput.length)
  const sizeDifference = acceptedLength - head.length

  return {
    results: head + printPadding(placeholderCharacter, sizeDifference),
    remainder: tail
  }
}
