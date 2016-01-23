import {getOperationType, convertPatternToPlaceholder} from './utilities.js'
import {operationTypes} from './enums.js'

export default function analyzeValue(value = '', previousValue = '', pattern = '') {
  const operationType = getOperationType(value, previousValue)
  const placeholder = convertPatternToPlaceholder(pattern)

  return value.split('').map((character, index) => {
    const isNewCharacter = value[index] !== previousValue[index]
    const isPartOfPlaceholder = character === '_'
    const isPartOfPattern = false

    return {
      character: character,
      newCharacter: isNewCharacter,
      partOfPlaceholder: isPartOfPlaceholder,
      partOfPattern: isPartOfPattern
    }
  })
}
