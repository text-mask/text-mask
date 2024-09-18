import { Config } from '../types/Config';
import {
  AllAtSymbolsRegExp,
  AllDotsRegExp,
  AtDot,
  AtSymbol,
  Dot,
  DotDot,
  EmptyArray,
  EmptyString,
} from '../utils/constants';

export default function emailPipe(conformedValue: string, config: Config) {
  const { currentCaretPosition, rawValue, previousConformedValue, placeholderChar } = config;

  let value: string = conformedValue;

  value = removeAllAtSymbolsButFirst(value);

  const indexOfAtDot = value.indexOf(AtDot);

  const emptyEmail = rawValue.match(new RegExp(`[^@\\s.${placeholderChar}]`)) === null;

  if (emptyEmail) {
    return EmptyString;
  }

  if (
    value.indexOf(DotDot) !== -1 ||
    (indexOfAtDot !== -1 && currentCaretPosition !== indexOfAtDot + 1) ||
    (rawValue.indexOf(AtSymbol) === -1 &&
      previousConformedValue !== EmptyString &&
      rawValue.indexOf(Dot) !== -1)
  ) {
    return false;
  }

  const indexOfAtSymbol = value.indexOf(AtSymbol);
  const domainPart = value.slice(indexOfAtSymbol + 1, value.length);

  if (
    (domainPart.match(AllDotsRegExp) || EmptyArray).length > 1 &&
    value.substr(-1) === Dot &&
    currentCaretPosition !== rawValue.length
  ) {
    value = value.slice(0, value.length - 1);
  }

  return value;
}

function removeAllAtSymbolsButFirst(str: string) {
  let atSymbolCount = 0;

  return str.replace(AllAtSymbolsRegExp, () => {
    atSymbolCount++;

    return atSymbolCount === 1 ? AtSymbol : EmptyString;
  });
}
