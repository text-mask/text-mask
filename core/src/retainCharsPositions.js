export default function({
  valueToConform,
  placeholder,
  currentCaretPosition,
  placeholderChar,
  previousConformedInput = '',
}) {
  const lengthOfDeletion = previousConformedInput.length - valueToConform.length
  const start = currentCaretPosition
  const end = currentCaretPosition + lengthOfDeletion
  const indexesOfDeletedChars = Array.from({length: end - start }, (x, i) => i + start)
  const valueToConformArr = valueToConform.split('')

  for (let i = 0; i < indexesOfDeletedChars.length; i++) {
    const indexOfDeletedChar = indexesOfDeletedChars[i]
    const charInPosition = (placeholder[indexOfDeletedChar] === placeholderChar) ?
      placeholderChar :
      placeholder[indexOfDeletedChar]

    valueToConformArr.splice(indexOfDeletedChar, 0, charInPosition)
  }

  return valueToConformArr.join('')
}
