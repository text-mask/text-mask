export const maskingCharactersEnums = {
  numeric: '1',
  alphabetic: 'A',
  alphanumeric: '?',
  uppercase: 'U',
  lowercase: 'L',
  any: '*'
}

export const maskingCharactersWithDescription = {
  '1': 'Any number',
  'A': 'Any letter',
  '?': 'Any number or letter',
  'U': 'Any letter (will be transformed to uppercase)',
  'L': 'Any letter (will be transformed to lowercase)',
  '*': 'Any character'
}

export const maskingCharacters = [
  '1',
  'A',
  '?',
  'U',
  'L',
  '*'
]

export const placeholderChar = '_'
