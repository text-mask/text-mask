import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
// export default _.filter((t) => t, [{
export default _.filter((t) => t.only, [{
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
}, {
  input: {
    startingInputFieldValue: '2 $',
    userModifiedInputFieldValue: '24 $',
    mask: '11 $',
    caretPositionAfterInputFieldValueChange: 2,
    conformedInputFieldValue: '24 $',
  },

  output: {
    adjustedCaretPosition: 2,
  },

  // only: true,
}, {
  input: {
    startingInputFieldValue: '$200.34',
    userModifiedInputFieldValue: '$2003.34',
    mask: '$1,111.11',
    caretPositionAfterInputFieldValueChange: 6,
    conformedInputFieldValue: '$2,003.34',
  },

  output: {
    adjustedCaretPosition: 6,
  },

  // TODO: for now, this works as expected. In the future, I'll want to make it possible to
  // prevent the caret from moving over the dot.
  skips: ['adjustedCaretPosition']
}])
