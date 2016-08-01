const asterisk = '*'
const dot = '.'
const emptyString = ''
const whiteSpaceRegExp = /\s/g
const atSymbol = '@'
const caretTrap = '[]'
const allAtSymbolsRegExp = /@/g
const allNoneSpaceChars = /[^ ]/g
const space = ' '
const allSpaceRegExp = / /g

export default function emailMask(rawValue, config) {
  console.clear()

  console.log('rawValue', rawValue)

  const {placeholderChar} = config
  const indexOfFirstAtSymbol = rawValue.indexOf(atSymbol)
  const indexOfLastDot = rawValue.lastIndexOf(dot)

  let localPartToDomainConnector = getLocalPartToDomainConnector(rawValue, indexOfFirstAtSymbol)
  let domainNameToTopLevelDomainConnector = getDomainNameToTopLevelDomainConnector(rawValue, indexOfLastDot)

  let localPart = getLocalPart(rawValue, indexOfFirstAtSymbol, placeholderChar)
  let domainName = getDomainName(rawValue, indexOfFirstAtSymbol, indexOfLastDot, placeholderChar)
  let topLevelDomain = getTopLevelDomain(rawValue, indexOfLastDot, indexOfFirstAtSymbol, rawValue, placeholderChar)

  localPart = convertToMask(localPart)
  domainName = convertToMask(domainName)
  topLevelDomain = convertToMask(topLevelDomain)

  let mask = (
    localPart +
    localPartToDomainConnector +
    domainName +
    domainNameToTopLevelDomainConnector +
    topLevelDomain
  )

  console.log('mask', mask)

  return mask
}

function getLocalPartToDomainConnector(rawValue, indexOfFirstAtSymbol) {
  let connector

  if (rawValue[indexOfFirstAtSymbol + 1] === atSymbol) {
    connector = atSymbol
  } else {
    connector = caretTrap + atSymbol
  }

  return connector + caretTrap
}

function getDomainNameToTopLevelDomainConnector(rawValue, indexOfLastDot) {
  let connector

  if (rawValue[indexOfLastDot - 1] === dot) {
    connector = dot
  } else {
    connector = caretTrap + dot
  }

  return connector + caretTrap
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

  domainName = removeMatch(domainName, allSpaceRegExp)
  domainName = removeMatch(domainName, new RegExp(placeholderChar, 'g'))

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

function getTopLevelDomain(str, indexOfLastDot, indexOfFirstAtSymbol, rawValue, placeholderChar) {
  let topLevelDomain = emptyString

  if (indexOfLastDot === -1 || indexOfFirstAtSymbol === -1 || indexOfLastDot < indexOfFirstAtSymbol) {
    topLevelDomain = space
  } else {
    topLevelDomain = str.slice(indexOfLastDot + 1, str.length)
  }

  topLevelDomain = removeMatch(topLevelDomain, allSpaceRegExp)
  topLevelDomain = removeMatch(topLevelDomain, new RegExp(placeholderChar, 'g'))

  if (rawValue[indexOfLastDot - 1] === dot) {
    return asterisk
  } else if (topLevelDomain.length < 1) {
    return emptyString
  } else {
    return topLevelDomain
  }
}


function removeMatch(str, regExp) {
  return str.replace(regExp, emptyString)
}

function convertToMask(str) {
  return str.replace(allNoneSpaceChars, asterisk)
}

function removeTrailingDot(str) {
  return (str[str.length - 1] === dot) ? str.slice(0, str.length - 1)  : str
}
