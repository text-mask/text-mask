const dollarSign = '$'
const emptyString = ''
const comma = ','
const one = '1'
const period = '.'
const noneDigitsRegExp = /\D+/g
const digitsRegExp = /\d/g
const number = 'number'

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
  return function numberMask(rawValue) {
    const rawValueLength = rawValue.length

    if (
      rawValue === emptyString ||
      (rawValue[0] === prefix[0] && rawValueLength === 1)
    ) {
      return `${prefix}${one}${suffix}`
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol)
    const hasDecimal = indexOfLastDecimal !== -1

    let integer
    let fraction
    let mask

    integer = rawValue

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(0, indexOfLastDecimal)
      fraction = convertToMask(rawValue.slice(indexOfLastDecimal + 1, rawValueLength))
    } else {
      integer = rawValue
    }

    integer = convertToMask(integer)

    mask = (includeThousandsSeparator) ? addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      mask += (rawValue[indexOfLastDecimal - 1] === decimalSymbol) ? '' : '[]'
      mask += `${decimalSymbol}[]`

      if (fraction) {
        if (typeof decimalLimit === number) {
          fraction = fraction.slice(0, decimalLimit)
        }
        mask += fraction
      } else if (requireDecimal === true) {
        for (let i = 0; i < decimalLimit; i++) {
          mask += one
        }
      }
    }

    return `${prefix}${mask}${suffix}`
  }
}

function convertToMask(strNumber) {
  return strNumber.replace(noneDigitsRegExp, emptyString).replace(digitsRegExp, one)
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparatorSymbol) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)
}
