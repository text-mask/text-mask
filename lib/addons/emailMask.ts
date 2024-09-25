import { Config } from '../types/Config';
import {
  AllWhitespaceRegExp,
  AnyNonDotOrWhitespaceRegExp,
  AnyNonWhitespaceRegExp,
  Asterisk,
  AtSymbol,
  CaretTrap,
  Dot,
  EmptyString,
  G,
  Space,
} from '../utils/constants';
import emailPipe from './emailPipe';

function emailMask(rawValue: string, config: Config) {
  rawValue = rawValue.replace(AllWhitespaceRegExp, EmptyString);

  const { placeholderChar, currentCaretPosition } = config;
  const indexOfFirstAtSymbol = rawValue.indexOf(AtSymbol);
  const indexOfLastDot = rawValue.lastIndexOf(Dot);
  const indexOfTopLevelDomainDot = indexOfLastDot < indexOfFirstAtSymbol ? -1 : indexOfLastDot;

  let localPartToDomainConnector = getConnector(rawValue, indexOfFirstAtSymbol + 1, AtSymbol);
  let domainNameToTopLevelDomainConnector = getConnector(
    rawValue,
    indexOfTopLevelDomainDot - 1,
    Dot,
  );

  let localPart = getLocalPart(rawValue, indexOfFirstAtSymbol);
  let domainName = getDomainName(
    rawValue,
    indexOfFirstAtSymbol,
    indexOfTopLevelDomainDot,
    placeholderChar,
  );
  let topLevelDomain = getTopLevelDomain(
    rawValue,
    indexOfTopLevelDomainDot,
    placeholderChar,
    currentCaretPosition,
  );

  const maskLocalPart = convertToMask(localPart);
  const maskDomainName = convertToMask(domainName);
  const maskTopLevelDomain = convertToMask(topLevelDomain, true);

  const mask = maskLocalPart
    .concat(localPartToDomainConnector)
    .concat(maskDomainName)
    .concat(domainNameToTopLevelDomainConnector)
    .concat(maskTopLevelDomain);

  return mask;
}

function getConnector(rawValue: string, indexOfConnection: number, connectionSymbol: string) {
  const connector = [];

  if (rawValue[indexOfConnection] === connectionSymbol) {
    connector.push(connectionSymbol);
  } else {
    connector.push(CaretTrap, connectionSymbol);
  }

  connector.push(CaretTrap);

  return connector;
}

function getLocalPart(rawValue: string, indexOfFirstAtSymbol: number) {
  if (indexOfFirstAtSymbol === -1) {
    return rawValue;
  } else {
    return rawValue.slice(0, indexOfFirstAtSymbol);
  }
}

function getDomainName(
  rawValue: string,
  indexOfFirstAtSymbol: number,
  indexOfTopLevelDomainDot: number,
  placeholderChar: string,
) {
  let domainName = EmptyString;

  if (indexOfFirstAtSymbol !== -1) {
    if (indexOfTopLevelDomainDot === -1) {
      domainName = rawValue.slice(indexOfFirstAtSymbol + 1, rawValue.length);
    } else {
      domainName = rawValue.slice(indexOfFirstAtSymbol + 1, indexOfTopLevelDomainDot);
    }
  }

  domainName = domainName.replace(new RegExp(`[\\s${placeholderChar}]`, G), EmptyString);

  if (domainName === AtSymbol) {
    return Asterisk;
  } else if (domainName.length < 1) {
    return Space;
  } else if (domainName[domainName.length - 1] === Dot) {
    return domainName.slice(0, domainName.length - 1);
  } else {
    return domainName;
  }
}

function getTopLevelDomain(
  rawValue: string,
  indexOfTopLevelDomainDot: number,
  placeholderChar: string,
  currentCaretPosition: number,
) {
  let topLevelDomain = EmptyString;

  if (indexOfTopLevelDomainDot !== -1) {
    topLevelDomain = rawValue.slice(indexOfTopLevelDomainDot + 1, rawValue.length);
  }

  topLevelDomain = topLevelDomain.replace(new RegExp(`[\\s${placeholderChar}.]`, G), EmptyString);

  if (topLevelDomain.length === 0) {
    return rawValue[indexOfTopLevelDomainDot - 1] === Dot &&
      currentCaretPosition !== rawValue.length
      ? Asterisk
      : EmptyString;
  } else {
    return topLevelDomain;
  }
}

function convertToMask(str: string, noDots?: boolean): (RegExp | string)[] {
  return str
    .split(EmptyString)
    .map((char) =>
      char === Space ? char : noDots ? AnyNonDotOrWhitespaceRegExp : AnyNonWhitespaceRegExp,
    );
}

export default { mask: emailMask, pipe: emailPipe };
