const adjustCaretPositionTests = [{
  input: {
    startingInputFieldValue: '(___)',
    userModifiedInputFieldValue: '(3___)',
    mask: '(111)',
    caretPositionAfterInputFieldValueChange: 2,
    conformedInputFieldValue: '(3__)',
  },

  output: {
    adjustedCaretPosition: 2,
  },
}]

export default adjustCaretPositionTests
