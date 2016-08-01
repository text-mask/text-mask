const atSymbol = '@'
const allAtSymbolsRegExp = /@/g
const emptyString = ''
const doubleDotsRegExp = /\.\./g
const dot = '.'
const atSymbolDot = '@.'

export default function emailPipe(conformedValue, config) {
  const {currentCaretPosition, rawValue, previousConformedValue} = config
  const indexesOfPipedChars = []

  let value = conformedValue

  value = removeAllAtSymbolsButFirst(value)

  const indexOfAtDot = value.indexOf('@.')

  console.log('value', value)
  console.log('indexOfAtDot', indexOfAtDot)
  console.log('currentCaretPosition', currentCaretPosition)

  if (
    value.indexOf('..') !== -1 ||
    indexOfAtDot !== -1 && currentCaretPosition !== (indexOfAtDot + 1) ||
    rawValue.indexOf('@') === -1 && previousConformedValue !== '' && rawValue !== ''
  ) {
    return false
  }

  const indexOfAtSymbol = value.indexOf(atSymbol)
  const domainPart = value.slice(indexOfAtSymbol + 1, value.length)

  if (
    (domainPart.match(/\./g) || []).length > 1 &&
    value.substr(-1) === '.' &&
    currentCaretPosition !== value.length
  ) {
    value = value.slice(0, value.length - 1)
  }

  return {
    value,
    indexesOfPipedChars
  }
}

function removeAllAtSymbolsButFirst(str) {
  let atSymbolCount = 0

  return str.replace(allAtSymbolsRegExp, () => {
    atSymbolCount++

    return (atSymbolCount === 1) ? atSymbol : emptyString
  })
}
