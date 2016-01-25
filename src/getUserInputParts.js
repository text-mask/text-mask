import {getDelimiters} from './utilities.js'

export default function getUserInputParts(userInput = '', pattern = '') {
  const userInputParts = []
  const delimiters = getDelimiters(pattern)

  let lastEncounteredUserInputChunk = ''
  userInput.split('').forEach((character) => {
    if (delimiters.indexOf(character) === -1) {
      lastEncounteredUserInputChunk += character
    } else if (lastEncounteredUserInputChunk.length > 0) {
      userInputParts.push(lastEncounteredUserInputChunk)
      lastEncounteredUserInputChunk = ''
    }
  })

  if (lastEncounteredUserInputChunk.length > 0) {
    userInputParts.push(lastEncounteredUserInputChunk)
  }

  return userInputParts
}

//
//return userInput.split('').reduce((accumulator, character) => {
//  if (delimiters.indexOf(character) === -1) {
//    accumulator += character
//  }
//
//  return accumulator
//}, '')
