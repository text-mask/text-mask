const atSymbol = '@'
const allAtSymbolsRegExp = /@/g
const emptyString = ''
const atDot = '@.'
const dot = '.'
const dotDot = '..'
const emptyArray = []
const allDotsRegExp = /\./g

export default function emailPipe(conformedValue, config) {
  const {currentCaretPosition, rawValue, previousConformedValue, placeholderChar} = config

  let value = conformedValue

  value = removeAllAtSymbolsButFirst(value)

  const indexOfAtDot = value.indexOf(atDot)

  const emptyEmail = rawValue.match(new RegExp(`[^@\\s.${placeholderChar}]`)) === null

  if (emptyEmail) {
    return emptyString
  }

  if (
    value.indexOf(dotDot) !== -1 ||
    indexOfAtDot !== -1 && currentCaretPosition !== (indexOfAtDot + 1) ||
    rawValue.indexOf(atSymbol) === -1 && previousConformedValue !== emptyString && rawValue.indexOf(dot) !== -1
  ) {
    return false
  }

  const indexOfAtSymbol = value.indexOf(atSymbol)
  const domainPart = value.slice(indexOfAtSymbol + 1, value.length)

  if (
    (domainPart.match(allDotsRegExp) || emptyArray).length > 1 &&
    value.substr(-1) === dot &&
    currentCaretPosition !== rawValue.length
  ) {
    value = value.slice(0, value.length - 1)
  }

  return value
}

function removeAllAtSymbolsButFirst(str) {
  let atSymbolCount = 0

  return str.replace(allAtSymbolsRegExp, () => {
    atSymbolCount++

    return (atSymbolCount === 1) ? atSymbol : emptyString
  })
}
