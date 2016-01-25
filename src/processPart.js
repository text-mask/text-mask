import {
  printPadding,
  removeCharactersStartingAtIndex
} from './utilities.js'
import {placeholderCharacter} from './constants.js'

export default function processPart(userInput = '', acceptedLength = 0) {
  while(
    userInput.length > acceptedLength &&
    userInput.indexOf(placeholderCharacter) !== -1
  ) {
    const indexOfLastPlaceholderChar = userInput.lastIndexOf(placeholderCharacter)

    userInput = removeCharactersStartingAtIndex(userInput, indexOfLastPlaceholderChar, 1)
  }

  const sizeDifference = acceptedLength - userInput.length

  return {
    results: (
      userInput.substr(0, acceptedLength) + printPadding(placeholderCharacter, sizeDifference)
    ),
    remainder: (
      userInput.substr(acceptedLength, userInput.length)
    )
  }
}
