import {
  maskingCharactersEnums,
  maskingCharacters,
  placeholderChar as defaultPlaceholderChar
} from './constants.js'

const emptyString = ''
const whiteSpaceRegExp = /\s/g
const alphabeticRegExp = /^[a-zA-Z]+$/

export function convertMaskToPlaceholder(mask = emptyString, placeholderChar = defaultPlaceholderChar) {
  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
      'that is not present in your mask as your placeholder character.\n\n' +
      `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
      `The mask that was received is: ${JSON.stringify(mask)}`
    )
  }

  let escaping = false
  let placeholder = emptyString

  for (let i = 0; i < mask.length; i++) {
    const character = mask[i]

    if (character === '\\' && escaping !== true) {
      escaping = true
      placeholder += emptyString
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

export function tokenize(string = emptyString) {
  return string.split(emptyString)
}

export function isAcceptableChar(character = emptyString, maskingCharacter) {
  switch (maskingCharacter) {
    case maskingCharactersEnums.numeric:
      return isNumeric(character)

    case maskingCharactersEnums.uppercase:
    case maskingCharactersEnums.lowercase:
    case maskingCharactersEnums.alphabetic:
      return isAlphabetic(character)

    case maskingCharactersEnums.alphanumeric:
      return isNumeric(character) || isAlphabetic(character)

    case maskingCharactersEnums.any:
      return whiteSpaceRegExp.test(character) === false

    default:
      return false
  }
}

export function potentiallyTransformChar(character = '', maskingCharacter) {
  switch (maskingCharacter) {
    case maskingCharactersEnums.uppercase:
      return character.toUpperCase()

    case maskingCharactersEnums.lowercase:
      return character.toLowerCase()

    default:
      return character
  }
}

function isNumeric(character) {
  return !isNaN(character) && whiteSpaceRegExp.test(character) !== true
}

function isAlphabetic(character) {
  return alphabeticRegExp.test(character)
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
  return value && value.length === undefined && !isNaN(value)
}

const strCaretTrap = '[]'
const caretTrapsRegExp = new RegExp(`[${strCaretTrap}]`, 'g')
export function processCaretTraps(mask) {
  const indexes = []

  let tempStr = mask

  let indexOfCaretTrap
  while(indexOfCaretTrap = tempStr.indexOf(strCaretTrap), indexOfCaretTrap !== -1) { // eslint-disable-line
    indexes.push(indexOfCaretTrap)

    tempStr = tempStr.slice(0, indexOfCaretTrap) + tempStr.slice(indexOfCaretTrap + strCaretTrap.length, tempStr.length)
  }

  return {maskWithoutCaretTraps: mask.replace(caretTrapsRegExp, emptyString), indexes}
}
