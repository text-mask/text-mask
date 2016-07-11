export default function createCurrencyMask({
  prefix = '$',
  suffix = ''
} = {}) {
  return function(rawValue) {
    rawValue = rawValue
      .replace(/\D+/g, '')
      .replace(/\d/g, '1')

    if (rawValue === '') {
      return `${prefix}1${suffix}`
    } else {
      return `${prefix}${numberWithCommas(rawValue)}${suffix}`
    }
  }
}

// http://stackoverflow.com/a/10899795/604296
function numberWithCommas(n) {
  var parts = n.toString().split('.')

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
}
