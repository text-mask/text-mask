export default function createCurrencyMask({
  prefix = '$',
  suffix = ''
} = {}) {
  return function(userInput) {
    userInput = userInput.replace(/\D+/g, '')
    userInput = userInput.replace(/\d/g, '1')

    return `${prefix}${numberWithCommas(userInput)}${suffix}`
  }
}

function numberWithCommas(n) {
  var parts = n.toString().split(".");

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
