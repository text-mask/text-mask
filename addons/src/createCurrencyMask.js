export default function createCurrencyMask() {
  return function(userInput) {
    userInput = userInput.replace(/\D+/g, '')
    userInput = userInput.replace(/\d/g, '1')

    return `$${numberWithCommas(userInput)}`
  }
}

function numberWithCommas(n) {
  var parts = n.toString().split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
