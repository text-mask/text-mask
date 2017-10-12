export default function createAutoCorrectedDateTimePipe(dateFormat = 'MM DD YYYY hh mm ss') {
  return function(conformedValue) {
    const indexesOfPipedChars = []
    const dateFormatArray = dateFormat.split(/[^DMYhms]+/)
    const maxValue = {'DD': 31, 'MM': 12, 'YY': 99, 'YYYY': 9999, 'hh': 24, 'mm': 59, 'ss': 59}
    const minValue = {'DD': 1, 'MM': 1, 'YY': 0, 'YYYY': 1, 'hh': 0, 'mm': 0, 'ss': 0}
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
