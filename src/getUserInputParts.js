import {getDelimiters} from './utilities.js'

export default function getUserInputParts(userInput = '', pattern = '') {
  //const userInputChunks = []
  const delimiters = getDelimiters(pattern)

  return userInput.split('').reduce((accumulator, character) => {
    if (delimiters.indexOf(character) === -1) {
      accumulator += character
    }

    return accumulator
  }, '')

  //let lastEncounteredUserInputChunk = ''
  //userInput.split('').forEach((character) => {
  //  if (delimiters.indexOf(character) === -1) {
  //    lastEncounteredUserInputChunk += character
  //  } else if (lastEncounteredUserInputChunk.length > 0) {
  //    userInputChunks.push(lastEncounteredUserInputChunk)
  //    lastEncounteredUserInputChunk = ''
  //  }
  //})
  //
  //if (lastEncounteredUserInputChunk.length > 0) {
  //  userInputChunks.push(lastEncounteredUserInputChunk)
  //}
  //
  //return userInputChunks
}
