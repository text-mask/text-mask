import {
  Comma,
  DollarSign,
  EmptyString,
  Period,
  DigitRegExp,
  Minus,
  NonDigitsRegExp,
  NumberString,
  CaretTrap,
  MinusRegExp,
} from '../utils/constants';

type CreateNumberMask = {
  prefix: string;
  suffix: string;
  includeThousandsSeparator: boolean;
  thousandsSeparatorSymbol: string;
  allowDecimal: boolean;
  decimalSymbol: string;
  decimalLimit: number;
  requireDecimal: boolean;
  allowNegative: boolean;
  allowLeadingZeroes: boolean;
  integerLimit: number | null;
};

export default function createNumberMask({
  prefix = DollarSign,
  suffix = EmptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = Comma,
  allowDecimal = false,
  decimalSymbol = Period,
  decimalLimit = 2,
  requireDecimal = false,
  allowNegative = false,
  allowLeadingZeroes = false,
  integerLimit = null,
}: CreateNumberMask) {
  const prefixLength = (prefix && prefix.length) || 0;
  const suffixLength = (suffix && suffix.length) || 0;
  const thousandsSeparatorSymbolLength =
    (thousandsSeparatorSymbol && thousandsSeparatorSymbol.length) || 0;

  function numberMask(rawValue = EmptyString) {
    const rawValueLength = rawValue.length;

    if (rawValue === EmptyString || (rawValue[0] === prefix[0] && rawValueLength === 1)) {
      // @ts-ignore
      return prefix.split(EmptyString).concat([DigitRegExp]).concat(suffix.split(EmptyString));
    } else if (rawValue === decimalSymbol && allowDecimal) {
      return (
        prefix
          .split(EmptyString)
          // @ts-ignore
          .concat(['0', decimalSymbol, DigitRegExp])
          .concat(suffix.split(EmptyString))
      );
    }

    const isNegative = rawValue[0] === Minus && allowNegative;
    //If negative remove "-" sign
    if (isNegative) {
      rawValue = rawValue.toString().substr(1);
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
    const hasDecimal = indexOfLastDecimal !== -1;

    let integer;
    let fraction;
    let mask;

    // remove the suffix
    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1);
    }

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(
        rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0,
        indexOfLastDecimal,
      );

      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
      fraction = convertToMask(fraction.replace(NonDigitsRegExp, EmptyString));
    } else {
      if (rawValue.slice(0, prefixLength) === prefix) {
        integer = rawValue.slice(prefixLength);
      } else {
        integer = rawValue;
      }
    }

    if (integerLimit && typeof integerLimit === NumberString) {
      const thousandsSeparatorRegex =
        thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
      const numberOfThousandSeparators = (
        integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []
      ).length;

      integer = integer.slice(
        0,
        integerLimit + numberOfThousandSeparators * thousandsSeparatorSymbolLength,
      );
    }

    integer = integer.replace(NonDigitsRegExp, EmptyString);

    if (!allowLeadingZeroes) {
      integer = integer.replace(/^0+(0$|[^0])/, '$1');
    }

    integer = includeThousandsSeparator
      ? addThousandsSeparator(integer, thousandsSeparatorSymbol)
      : integer;

    mask = convertToMask(integer);

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask.push(CaretTrap);
      }

      mask.push(decimalSymbol, CaretTrap);

      if (fraction) {
        if (typeof decimalLimit === NumberString) {
          fraction = fraction.slice(0, decimalLimit);
        }

        mask = mask.concat(fraction);
      }

      if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
        mask.push(DigitRegExp);
      }
    }

    if (prefixLength > 0) {
      mask = prefix.split(EmptyString).concat(mask as string[]);
    }

    if (isNegative) {
      // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
      if (mask.length === prefixLength) {
        mask.push(DigitRegExp);
      }

      mask = [MinusRegExp].concat(mask as RegExp[]);
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(EmptyString));
    }

    return mask;
  }

  numberMask.instanceOf = 'createNumberMask';

  return numberMask;
}

function convertToMask(strNumber: string) {
  return strNumber.split(EmptyString).map((char) => (DigitRegExp.test(char) ? DigitRegExp : char));
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n: string, thousandsSeparatorSymbol: string) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
}
