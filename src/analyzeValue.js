import {getOperationType, convertPatternToPlaceholder} from './utilities.js'
import {operationTypes} from './constants.js'
import diff from 'diff'

const {diffChars} = diff

export default function analyzeValue(previousValue = '', newValue = '', pattern = '') {
  return diffChars(previousValue, newValue);

  //const operationType = getOperationType(newValue, previousValue)
  //const placeholder = convertPatternToPlaceholder(pattern)
  //
  //return newValue.split('').map((character, index) => {
  //  const isNewCharacter = newValue[index] !== previousValue[index]
  //  const isPartOfPlaceholder = character === '_'
  //  const isPartOfPattern = false
  //
  //  return {
  //    character: character,
  //    newCharacter: isNewCharacter,
  //    partOfPlaceholder: isPartOfPlaceholder,
  //    partOfPattern: isPartOfPattern
  //  }
  //})
}
