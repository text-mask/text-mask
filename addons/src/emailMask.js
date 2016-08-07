const asterisk = '*'
const dot = '.'
const emptyString = ''
const atSymbol = '@'
const caretTrap = '[]'
const space = ' '
const g = 'g'
const anyNonWhitespaceRegExp = /[^\s]/
const anyNonDotOrWhitespaceRegExp = /[^.\s]/
const allWhitespaceRegExp = /\s/g

export default function emailMask(rawValue, config) {
  rawValue = rawValue.replace(allWhitespaceRegExp, emptyString)

  const {placeholderChar, currentCaretPosition} = config
  const indexOfFirstAtSymbol = rawValue.indexOf(atSymbol)
  const indexOfLastDot = rawValue.lastIndexOf(dot)
  const indexOfTopLevelDomainDot = (indexOfLastDot < indexOfFirstAtSymbol) ? -1 : indexOfLastDot

  let localPartToDomainConnector = getLocalPartToDomainConnector(rawValue, indexOfFirstAtSymbol)
  let domainNameToTopLevelDomainConnector = getDomainNameToTopLevelDomainConnector(rawValue, indexOfTopLevelDomainDot)

  let localPart = getLocalPart(rawValue, indexOfFirstAtSymbol, placeholderChar)
  let domainName = getDomainName(rawValue, indexOfFirstAtSymbol, indexOfTopLevelDomainDot, placeholderChar)
  let topLevelDomain = getTopLevelDomain(
    rawValue,
    indexOfTopLevelDomainDot,
    indexOfFirstAtSymbol,
    rawValue,
    placeholderChar,
    currentCaretPosition
  )

  localPart = convertToMask(localPart)
  domainName = convertToMask(domainName)
  topLevelDomain = convertToMask(topLevelDomain, true)

  const mask = localPart
    .concat(localPartToDomainConnector)
    .concat(domainName)
    .concat(domainNameToTopLevelDomainConnector)
    .concat(topLevelDomain)

  return mask
}

function getLocalPartToDomainConnector(rawValue, indexOfFirstAtSymbol) {
  const connector = []

  if (rawValue[indexOfFirstAtSymbol + 1] === atSymbol) {
    connector.push(atSymbol)
  } else {
    connector.push(caretTrap, atSymbol)
  }

  connector.push(caretTrap)

  return connector
}

function getDomainNameToTopLevelDomainConnector(rawValue, indexOfLastDot) {
  const connector = []

  if (rawValue[indexOfLastDot - 1] === dot) {
    connector.push(dot)
  } else {
    connector.push(caretTrap, dot)
  }

  connector.push(caretTrap)

  return connector
}

function getLocalPart(str, indexOfFirstAtSymbol) {
  if (indexOfFirstAtSymbol === -1) {
    return str
  } else {
    return str.slice(0, indexOfFirstAtSymbol)
  }
}

function getDomainName(str, indexOfFirstAtSymbol, indexOfLastDot, placeholderChar) {
  let domainName = emptyString

  if (indexOfFirstAtSymbol === -1) {
    domainName = space
  } else {
    if (indexOfLastDot === -1) {
      domainName = str.slice(indexOfFirstAtSymbol + 1, str.length)
    } else {
      domainName = str.slice(indexOfFirstAtSymbol + 1, indexOfLastDot)
    }
  }

  domainName = domainName.replace(new RegExp(`[\\s${placeholderChar}]`, g), emptyString)

  if (domainName === atSymbol) {
    return asterisk
  } else if (domainName.length < 1) {
    return space
  } else {
    if (domainName[domainName.length - 1] === dot && domainName.length !== 1) {
      return domainName.slice(0, domainName.length - 1)
    } else {
      return domainName
    }
  }
}

function getTopLevelDomain(str, indexOfLastDot, indexOfFirstAtSymbol, rawValue, placeholderChar, currentCaretPosition) {
  let topLevelDomain = emptyString

  if (indexOfLastDot === -1 || indexOfFirstAtSymbol === -1 || indexOfLastDot < indexOfFirstAtSymbol) {
    topLevelDomain = space
  } else {
    topLevelDomain = str.slice(indexOfLastDot + 1, str.length)
  }

  topLevelDomain = topLevelDomain.replace(new RegExp(`[\\s${placeholderChar}.]`, g), emptyString)

  if (rawValue[indexOfLastDot - 1] === dot) {
    if (currentCaretPosition === rawValue.length) {
      return emptyString
    } else {
      return asterisk
    }
  } else if (topLevelDomain.length < 1) {
    return emptyString
  } else {
    return topLevelDomain
  }
}

function convertToMask(str, noDots) {
  return str
    .split(emptyString)
    .map((char) => char === space ? char : (noDots) ? anyNonDotOrWhitespaceRegExp : anyNonWhitespaceRegExp)
}
