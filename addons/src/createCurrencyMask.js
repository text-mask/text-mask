const dollarSign = '$'
const emptyString = ''
const comma = ','
const strOne = '1'
const noneDigitsRegExp = /\D+/g
const digitsRegExp = /\d/g

export default function createCurrencyMask({
  prefix = dollarSign,
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparator = comma,
  acceptFraction = true
} = {}) {
  return function(rawValue, config = {}) {
    if (rawValue === emptyString) { return `${prefix}${strOne}${suffix}` }

    const {previousConformedValue} = config

    const isDeletion = previousConformedValue.length > rawValue.length

    const indexOfLastDecimal = rawValue.lastIndexOf('.')
    const hasDecimal = indexOfLastDecimal !== -1

    let integer
    let fraction
    let numberMask

    integer = rawValue

    if (hasDecimal) {
      integer = rawValue.slice(0, indexOfLastDecimal)
      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValue.length)
    } else {
      integer = rawValue
    }

    integer = sanitizeInput(integer)

    numberMask = (includeThousandsSeparator) ?
      addThousandsSeparator(integer, thousandsSeparator) :
      integer

    if (hasDecimal && acceptFraction) {
      numberMask += '.'

      if (fraction) {
        numberMask += sanitizeInput(fraction)
      } else if (isDeletion) {
        numberMask += strOne
      }
    }

    // console.log('fraction', fraction)

    // if (acceptFraction) {
    //   numberMask += '.' + fraction
    // }

    console.log('isDeletion', isDeletion)
    console.log('numberMask', numberMask)

    return `${prefix}${numberMask}${suffix}`
  }
}

function sanitizeInput(strNumber) {
  return strNumber.replace(noneDigitsRegExp, '').replace(digitsRegExp, strOne)
}

// http://stackoverflow.com/a/10899795/604296
function addThousandsSeparator(n, thousandsSeparator) {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
}
