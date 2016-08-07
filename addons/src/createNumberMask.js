const dollarSign = '$'
const emptyString = ''
const comma = ','
const period = '.'
const nonDigitsRegExp = /\D+/g
const number = 'number'
const digitRegExp = /\d/

export default function createNumberMask({
  prefix = dollarSign,
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = comma,
  allowDecimal = false,
  decimalSymbol = period,
  decimalLimit = 2,
  requireDecimal = false
} = {}) {
  function numberMask(rawValue) {
    const rawValueLength = rawValue.length

    if (
      rawValue === emptyString ||
      (rawValue[0] === prefix[0] && rawValueLength === 1)
    ) {
      return prefix.split(emptyString).concat([digitRegExp]).concat(suffix.split(emptyString))
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol)
    const hasDecimal = indexOfLastDecimal !== -1

    let integer
    let fraction
    let mask

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(0, indexOfLastDecimal)

      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength)
      fraction = convertToMask(fraction.replace(nonDigitsRegExp, emptyString))
    } else {
      integer = rawValue
    }

    integer = integer.replace(nonDigitsRegExp, emptyString)

    integer = (includeThousandsSeparator) ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer

    mask = convertToMask(integer)

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask.push('[]')
      }

      mask.push(decimalSymbol, '[]')

      if (fraction) {
        if (typeof decimalLimit === number) {
          fraction = fraction.slice(0, decimalLimit)
        }

        mask = mask.concat(fraction)
      } else if (requireDecimal === true) {
        for (let i = 0; i < decimalLimit; i++) {
          mask.push(digitRegExp)
        }
      }
    }

    if (prefix.length > 0) {
      mask = prefix.split(emptyString).concat(mask)
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(emptyString))
    }

    return mask
  }

  numberMask.instanceOf = 'createNumberMask'

  return numberMask
}

function convertToMask(strNumber) {
  return strNumber
    .split(emptyString)
    .map((char) => digitRegExp.test(char) ? digitRegExp : char)
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)
}
