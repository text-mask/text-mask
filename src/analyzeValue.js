import {getOperationType} from './utilities.js'
import {operationTypes} from './enums.js'

export default function analyzeValue(value = '', previousValue = '', pattern = '') {
  const operationType = getOperationType(value, previousValue)

  return value.split('').map((character, index) => {
    const isNewCharacter = value[index] !== previousValue[index]

    return {
      character: character,
      newCharacter: isNewCharacter,
      userInputted: true,
      partOfPlaceholder: true
    }
  })
}
