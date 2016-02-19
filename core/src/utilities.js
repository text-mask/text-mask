import {operationTypes, maskingCharacters, placeholderCharacter} from './constants.js'

export function convertMaskToPlaceholder(mask = '') {
  return mask.replace(/1/g, placeholderCharacter)
}

export function getDelimiters(mask ='') {
  return mask.split('').reduce((accumulator, character) => {
    if (maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
      accumulator.push(character)
    }

    return accumulator
  }, [])
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
