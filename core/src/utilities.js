import {
  maskingCharactersEnums,
  maskingCharacters,
  placeholderCharacter as defaultPlaceholderChar
} from './constants.js'

export function convertMaskToPlaceholder(mask = '', placeholderChar = defaultPlaceholderChar) {
  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
      'that is not present in your mask as your placeholder character.\n\n' +
      `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
      `The mask that was received is: ${JSON.stringify(mask)}`
    )
  }

  let escaping = false
  let placeholder = ''

  for (let i = 0; i < mask.length; i++) {
    const character = mask[i]

    if (character === '\\' && escaping !== true) {
      escaping = true
      placeholder += ''
      continue
    }

    if (escaping === true) {
      escaping = false
      placeholder += character
      continue
    }

    placeholder += (maskingCharacters.indexOf(character) !== -1) ?
      placeholderChar :
      character
  }

  return placeholder
}

export function unescapeMask(mask = '') {
  return mask.replace(/\\./g, ' ')
}

export function tokenize(string = '') {
  return string.split('')
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

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
  return value && value.length === undefined && !isNaN(value)
}
