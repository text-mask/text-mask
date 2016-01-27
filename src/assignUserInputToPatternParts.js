import {removeCharactersStartingAtIndex} from './utilities.js'
import processPart from './processPart.js'

export default function assignUserInputToPatternParts(patternParts = [], userInputParts = []) {
  let userInputIndex = 0
  let remainderFromLastProcessedUserInput = ''

  return patternParts.map((patternPart) => {
    let {content, length} = patternPart

    if (length === 0) {
      return {
        ...patternPart,
        content
      }
    } else {
      const userInput = (userInputParts && userInputParts[userInputIndex]) ?
        remainderFromLastProcessedUserInput + userInputParts[userInputIndex] :
        remainderFromLastProcessedUserInput

      const {remainder, results} = processPart(userInput, length)

      remainderFromLastProcessedUserInput = remainder
      userInputIndex++

      return {
        ...patternPart,
        content: results
      }
    }
  })
}
