const monthsLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const parseNumber = (number) => parseInt(number, 10)

export default function mmddyyyyValidator(char, index, conformedUserInput) {
  // 12/03/2039
  const newDigit = Number(char)
  const monthNumber = parseNumber(conformedUserInput.substr(0, 2))
  const dayNumber = parseNumber(conformedUserInput.substr(3, 5))
  const yearNumber = parseNumber(conformedUserInput.substr(6, 10))

  const monthLength = (monthNumber) ? monthsLengths[monthNumber - 1] : null

  // Basic sanity
  if (index === 0) {
    if (newDigit > 1) {
      // Can't have a month number that begins with 2, 3, or 4, etc...
      return false
    }
  } else if (index === 1) {
    if (
      // Can't have 2nd digit greater than 2, if first digit is 1.
      conformedUserInput[0] === '1' && newDigit > 2 ||

      // Can't have 2nd digit less than 1 if 1st digit is 0
      conformedUserInput[0] === '0' && newDigit < 1
    ) {
      return false
    }
  } else if (index === 3) {
    if (newDigit > 3) {
      // Can't have a day number that begins with 4, 5, or 6, etc...
      return false
    }
  } else if (index === 4) {
    if (
      // Can't have a 2nd digit less than 1 if 1st digit is 0
      conformedUserInput[3] === '0' && newDigit < 1 ||

      // Can't have a 2nd digit greater than 1 if 1st digit is 3
      conformedUserInput[3] === '3' && newDigit > 1
    ) {
      return false
    }
  }

  console.log('dayNumber', dayNumber)
  console.log('monthNumber', monthNumber)
  console.log('monthsLengths', monthLength)
  if (dayNumber && monthNumber && (dayNumber > monthLength)) {
    console.log('=\nFILE: mmddyyyyValidator.js\nLINE: 50\n=')
    return false
  }

  return true
}


function isValidDate(dateString) {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
