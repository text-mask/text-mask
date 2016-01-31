import {operationTypes, maskingCharacters, placeholderCharacter} from './constants.js'

export function convertPatternToPlaceholder(pattern = '') {
  return pattern.replace(/1/g, placeholderCharacter)
}

export function removeCharactersStartingAtIndex(string = '', index = 0, numberOfCharacters = 1) {
  return string.substring(0, index) + string.substring(index + numberOfCharacters)
}

export function getOperationType(currentValue = '', previousValue = '') {
  return (currentValue.length === previousValue.length) ? operationTypes.replacement :
    (currentValue.length > previousValue.length) ? operationTypes.addition :
      (currentValue.length < previousValue.length) ? operationTypes.deletion :
        null
}

export function getDelimiters(pattern ='') {
  return pattern.split('').reduce((accumulator, character) => {
    if (maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
      accumulator.push(character)
    }

    return accumulator
  }, [])
}

export function printPadding(paddingCharacter, length) {
  return Array.from({length: length}, () => paddingCharacter).join('')
}

export function findCharacter(characterPositions = [], location = {}) {
  for (let i = 0; i < characterPositions.length; i++) {
    const characterPosition = characterPositions[i]

    if (
      characterPosition.area === location.area &&
      characterPosition.position === location.position
    ) {
      return characterPosition.character
    }
  }
}

export function constructConformedString(patternPartsWithContent) {
  return patternPartsWithContent.reduce((accumulator, editableAreaWithContent) => {
    const {content = '', length, delimiter} = editableAreaWithContent
    const contentAndLengthDelta = length - content.length
    const padding = printPadding(placeholderCharacter, contentAndLengthDelta)

    accumulator += content + padding + (delimiter || '')

    return accumulator
  }, '')
}
