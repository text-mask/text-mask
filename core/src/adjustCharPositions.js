import {tokenize} from './utilities.js'

export default function adjustCharPositions({
  placeholderChar,
  previousConformedValue,
  conformedValue,
  indexOfFirstChange,
  placeholder
}) {
  const previousNumberOfPlaceholderChars = countPlaceholderChars(previousConformedValue, placeholderChar) 
  const currentNumberOfPlaceholderChars = countPlaceholderChars(conformedValue, placeholderChar)
  
  if (previousNumberOfPlaceholderChars !== currentNumberOfPlaceholderChars) {
    const shiftAllCharsAfterIndex = indexOfFirstChange

    let requiredNumberOfShifts = Math.abs(
      previousNumberOfPlaceholderChars - currentNumberOfPlaceholderChars
    )

    while (requiredNumberOfShifts > 0) {
      if (previousNumberOfPlaceholderChars > currentNumberOfPlaceholderChars) {

      } else {
        // Find user input char from the end
        for (let i = conformedValue.length; i >= 0; i--) {

          for (let i = conformedValue.length - 2; i >= indexOfFirstChange; i--) {
            const splicedChar = conformedStringArr.splice(i, 1)
            conformedStringArr.splice(i + 1, 0, splicedChar)
          }
        }

        requiredNumberOfShifts--
      }
    }
  }

  return conformedStringArr.join('')
}

function countPlaceholderChars(string, placeholderChar) {
  const nonPlaceholderCharsRegex = new RegExp(`[^${placeholderChar}]`, 'g')
  
  return string.replace(nonPlaceholderCharsRegex, '').length
}
