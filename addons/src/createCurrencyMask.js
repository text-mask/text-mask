export default function createCurrencyMask({
  prefix = '$',
  suffix = ''
} = {}) {
  return function(userInput) {
    userInput = userInput
      .replace(/\D+/g, '')
      .replace(/\d/g, '1')

    if (userInput === '') {
      return `${prefix}1${suffix}`
    } else {
      return `${prefix}${numberWithCommas(userInput)}${suffix}`
    }
  }
}

// http://stackoverflow.com/a/10899795/604296
function numberWithCommas(n) {
  var parts = n.toString().split('.')

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
}
