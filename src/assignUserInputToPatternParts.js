import {removeCharactersStartingAtIndex} from './utilities.js'
import processPart from './processPart.js'

export default function assignUserInputToPatternParts(patternParts = [], userInputParts = []) {
  let userInputIndex = 0
  let remainderFromLastProcessedUserInput = ''

  return patternParts.map((patternPart) => {
    const {length} = patternPart

    if (length === 0) { return patternPart }

    const userInput = (userInputParts && userInputParts[userInputIndex]) ?
      remainderFromLastProcessedUserInput + userInputParts[userInputIndex] :
      remainderFromLastProcessedUserInput

    const {remainder, results} = processPart(userInput, length)

    remainderFromLastProcessedUserInput = remainder
    userInputIndex++

    patternPart.content = results

    return patternPart
  })
}
