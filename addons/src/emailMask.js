export default function({
  valueToConform = '',
  currentCaretPosition,
  placeholderCharacter: placeholderChar
}) {
  const maskParts = []
  // const needsAtSymbolTrap = valueToConform.indexOf('@@') === -1
  const needsAtSymbolTrap = true
  const indexOfFirstAtSymbol = valueToConform.indexOf('@')
  const onlyHasLocalPart = indexOfFirstAtSymbol === -1

  if (onlyHasLocalPart) {
    return `${convertToMask(valueToConform)}[]@*[].*`
  }

  const localPart = valueToConform.slice(0, indexOfFirstAtSymbol)

  const domainPart = valueToConform.slice(indexOfFirstAtSymbol + 1, valueToConform.length)
  // const needsTopLevelDomainTrap = domainPart.indexOf('..') === -1
  const needsTopLevelDomainTrap = true
  const indexOfLastDot = domainPart.lastIndexOf('.')
  const domainName = domainPart.slice(0, indexOfLastDot) || '*'
  const topLevelDomain = domainPart.slice(indexOfLastDot + 1, domainPart.length) || '*'

  maskParts.push(convertToMask(localPart))

  if (needsAtSymbolTrap) {
    maskParts.push('[]')
  }

  if (valueToConform.indexOf('@') === -1) {
    maskParts.push('@')
  }

  maskParts.push(convertToMask(domainName))

  if (needsTopLevelDomainTrap) {
    maskParts.push('[]')
  }

  if (valueToConform.indexOf('.') === -1) {
    maskParts.push('.')
  }

  maskParts.push(convertToMask(topLevelDomain))

  const mask = maskParts.join('')

  console.log('mask', mask)

  return mask

  // const [localPart, domainPart = ''] = valueToConform.split('@')
  // const indexOfLastDot = domainPart.lastIndexOf('.')
  // const domainName = domainPart.slice(0, indexOfLastDot)
  // const topLevelDomain = domainPart.slice(indexOfLastDot, domainPart.length)

  // console.log('domainName', domainName)
  // console.log('topLevelDomain', topLevelDomain)

  // const localPartMask = localPart.replace(/./g, '*')
}

const anyCharRegex = /./g
function convertToMask(string) {
  return string.replace(anyCharRegex, '*')
}
