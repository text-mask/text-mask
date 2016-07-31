const asterisk = '*'
const dot = '.'
const emptyString = ''
const whiteSpaceRegExp = /\s/g
const atSymbol = '@'

export default function emailMask(rawValue, config) {
  const {placeholderChar} = config
  const indexOfFirstAtSymbol = rawValue.indexOf(atSymbol)

  console.clear()

  console.log('rawValue', rawValue)

  // Sanitize rawValue
  rawValue = rawValue
    // Remove placeholder chars
    .replace(new RegExp(`[${placeholderChar}]`, 'g'), '')

  // Remove the `.` if it exists in the end
  if (rawValue[rawValue.length - 1] === dot) {
    rawValue = rawValue.slice(0, rawValue.length - 1)
  }

  let localPart = ''
  let domainPart = ''
  let mask = ''

  // Check if user input has local and domain parts
  // If it doesn't, that means there's only local part in the raw value
  if (indexOfFirstAtSymbol === -1) {
    localPart = convertToMask(rawValue)
  } else {
    localPart = rawValue.slice(0, indexOfFirstAtSymbol)
    domainPart = rawValue.slice(indexOfFirstAtSymbol + 1, rawValue.length)

    localPart = convertToMask(localPart)
    domainPart = convertToMask(domainPart)
  }

  console.log('localPart', localPart)
  mask += localPart

  if (rawValue[indexOfFirstAtSymbol + 1] !== atSymbol) {
    mask += '[]'
  }

  mask += '@'

  console.log('domainPart', domainPart)
  mask += domainPart

  console.log('mask', mask)

  // Remove unaccepted characters from rawValue
  // Remove all but the first at symbol
  rawValue = removeAllAtSymbolsButFirst(rawValue, indexOfFirstAtSymbol)

  return mask
}

function convertToMask(str) {
  return str.replace(/./g, asterisk)
}

function removeAllAtSymbolsButFirst(str, indexOfFirstAtSymbol) {
  const localPart = str.slice(0, indexOfFirstAtSymbol + 1)
  const rest = str.slice(indexOfFirstAtSymbol + 1, str.length)

  return localPart + rest.split(atSymbol).join('')
}
