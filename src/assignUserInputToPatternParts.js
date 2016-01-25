import {removeCharactersStartingAtIndex} from './utilities.js'
import processPart from './processPart.js'

export default function assignUserInputToPatternParts(patternParts = [], userInputParts = []) {
  let remainderFromLastProcessedUserInput = ''

  return patternParts.map((patternPart, index) => {
    let {content, length} = patternPart

    if (length === 0) {
      return {
        ...patternPart,
        content
      }
    } else {
      const userInput = (userInputParts && userInputParts[index]) ?
        remainderFromLastProcessedUserInput + userInputParts[index] :
        remainderFromLastProcessedUserInput

      const {remainder, results} = processPart(userInput, length)

      remainderFromLastProcessedUserInput = remainder

      return {
        ...patternPart,
        content: results
      }
    }
  })
}
