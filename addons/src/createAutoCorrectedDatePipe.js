export default function createAutoCorrectedDatePipe(dateFormat = 'mm dd yyyy') {
  return function(conformedValue) {
    const indexesOfPipedChars = []
    const dateFormatArray = dateFormat.split(/[^dmyHMS]+/)
    const maxValue = {'dd': 31, 'mm': 12, 'yy': 99, 'yyyy': 9999, 'HH': 23, 'MM': 59, 'SS': 59}
    const minValue = {'dd': 1, 'mm': 1, 'yy': 0, 'yyyy': 1, 'HH': 0, 'MM': 0, 'SS': 0}
    const conformedValueArr = conformedValue.split('')

    // Check first digit
    dateFormatArray.forEach((format) => {
      const position = dateFormat.indexOf(format)
      const maxFirstDigit = parseInt(maxValue[format].toString().substr(0, 1), 10)

      if (parseInt(conformedValueArr[position], 10) > maxFirstDigit) {
        conformedValueArr[position + 1] = conformedValueArr[position]
        conformedValueArr[position] = 0
        indexesOfPipedChars.push(position)
      }
    })

    // Check for invalid date
    const isInvalid = dateFormatArray.some((format) => {
      const position = dateFormat.indexOf(format)
      const length = format.length
      const textValue = conformedValue.substr(position, length).replace(/\D/g, '')
      const value = parseInt(textValue, 10)

      return value > maxValue[format] || (textValue.length === length && value < minValue[format])
    })

    if (isInvalid) {
      return false
    }

    return {
      value: conformedValueArr.join(''),
      indexesOfPipedChars
    }
  }
}
