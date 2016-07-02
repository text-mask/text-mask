const dynamicMaskTests = [{
  input: {
    startingInputFieldValue: '$100',
    userModifiedInputFieldValue: '$1000',
    mask: '$1,111',
    caretPositionAfterInputFieldValueChange: 5,
    conformedInputFieldValue: '$1,000',
  },

  output: {
    adjustedCaretPosition: 6,
  },
}]

export default dynamicMaskTests
