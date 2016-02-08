import {operationTypes, maskingCharacters, placeholderCharacter} from './constants.js'

export function convertMaskToPlaceholder(mask = '') {
  return mask.replace(/1/g, placeholderCharacter)
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

export function getDelimiters(mask ='') {
  return mask.split('').reduce((accumulator, character) => {
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
