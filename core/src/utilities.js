import {
  maskingCharactersEnums,
  maskingCharacters,
  placeholderCharacter
} from './constants.js'

export function convertMaskToPlaceholder(mask = '') {
  return tokenize(mask).map((character) => {
    return (maskingCharacters.indexOf(character) !== -1) ?
      placeholderCharacter :
      character
  }).join('')
}

export function getDelimiters(mask = '') {
  return tokenize(mask).reduce((accumulator, character) => {
    if (maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
      accumulator.push(character)
    }

    return accumulator
  }, [])
}

export function tokenize(string = '') {
  return string.split('')
}

export function contains(array, needle) {
  return array.indexOf(needle) !== -1
}

export function isAcceptableCharacter(character = '', maskingCharacter) {
  switch(maskingCharacter) {
    case maskingCharactersEnums.numeric:
      return isNumeric(character)

    case maskingCharactersEnums.uppercase:
    case maskingCharactersEnums.lowercase:
    case maskingCharactersEnums.alphabetic:
      return isAlphabetic(character)

    case maskingCharactersEnums.alphanumeric:
      return isNumeric(character) || isAlphabetic(character)

    case maskingCharactersEnums.any:
      return true

    default:
      return false
  }
}

export function potentiallyTransformCharacter(character = '', maskingCharacter) {
  switch(maskingCharacter) {
    case maskingCharactersEnums.uppercase:
      return character.toUpperCase()

    case maskingCharactersEnums.lowercase:
      return character.toLowerCase()

    default:
      return character
  }
}

function isNumeric(character) {
  return !isNaN(character) && character !== ' '
}

function isAlphabetic(character) {
  return /^[a-zA-Z]+$/.test(character)
}

export function getIndexOfFirstChange(stringOne, stringTwo) {
  const longestLength = (stringOne.length > stringTwo.length) ? stringOne.length : stringTwo.length

  for (let i = 0; i < longestLength; i++) {
    if (stringOne[i] !== stringTwo[i]) {
      return i
    }
  }

  return null
}
